from flask import Flask, render_template, request, jsonify, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from datetime import datetime, timedelta
import json
import os
from werkzeug.security import generate_password_hash, check_password_hash
from googletrans import Translator
from textblob import TextBlob
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import schedule
from translate import Translator
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from apscheduler.schedulers.background import BackgroundScheduler

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///space_cafe.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'static/uploads'

db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# AI Services
translator = Translator()
sentiment_analyzer = SentimentIntensityAnalyzer()
scheduler = BackgroundScheduler()
vectorizer = TfidfVectorizer()

# Models
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    is_admin = db.Column(db.Boolean, default=False)
    preferred_language = db.Column(db.String(10), default='en')
    characters = db.relationship('Character', backref='owner', lazy=True)
    posts = db.relationship('Post', backref='author', lazy=True)
    comments = db.relationship('Comment', backref='author', lazy=True)
    interests = db.relationship('Interest', backref='user', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Interest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    topic = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

class Character(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text)
    avatar_url = db.Column(db.String(200))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    posts = db.relationship('Post', backref='character', lazy=True)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(200))
    music_url = db.Column(db.String(200))
    video_url = db.Column(db.String(200))
    space_type = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    character_id = db.Column(db.Integer, db.ForeignKey('character.id'))
    comments = db.relationship('Comment', backref='post', lazy=True)
    reactions = db.relationship('Reaction', backref='post', lazy=True)
    sentiment_score = db.Column(db.Float)
    language = db.Column(db.String(10), default='en')

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)
    character_id = db.Column(db.Integer, db.ForeignKey('character.id'))

class Reaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    emoji = db.Column(db.String(10), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)

# Social Models
class Follow(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    followed_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    type = db.Column(db.String(20), nullable=False)  # follow, like, comment, mention
    reference_id = db.Column(db.Integer)  # ID of the related post/comment/user
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class GroupChat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    creator_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    members = db.relationship('GroupChatMember', backref='group', lazy=True)
    messages = db.relationship('GroupChatMessage', backref='group', lazy=True)

class GroupChatMember(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.Integer, db.ForeignKey('group_chat.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    role = db.Column(db.String(20), default='member')  # member, admin
    joined_at = db.Column(db.DateTime, default=datetime.utcnow)

class GroupChatMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.Integer, db.ForeignKey('group_chat.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Data Analysis Models
class UserActivity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    activity_type = db.Column(db.String(50), nullable=False)  # post, comment, reaction, follow
    reference_id = db.Column(db.Integer)  # ID of the related post/comment/user
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class TrendAnalysis(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    topic = db.Column(db.String(100), nullable=False)
    score = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class InsightReport(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    report_type = db.Column(db.String(50), nullable=False)  # daily, weekly, monthly
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Settings Models
class UserSettings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    # AI Features
    enable_translation = db.Column(db.Boolean, default=True)
    enable_sentiment_analysis = db.Column(db.Boolean, default=True)
    enable_content_recommendation = db.Column(db.Boolean, default=True)
    
    # Social Features
    enable_notifications = db.Column(db.Boolean, default=True)
    enable_group_chat = db.Column(db.Boolean, default=True)
    enable_follow_system = db.Column(db.Boolean, default=True)
    
    # Mobile Features
    enable_push_notifications = db.Column(db.Boolean, default=True)
    enable_offline_mode = db.Column(db.Boolean, default=True)
    
    # Data Analysis
    enable_activity_tracking = db.Column(db.Boolean, default=True)
    enable_trend_analysis = db.Column(db.Boolean, default=True)
    
    # Privacy Settings
    show_online_status = db.Column(db.Boolean, default=True)
    show_activity_status = db.Column(db.Boolean, default=True)
    allow_data_collection = db.Column(db.Boolean, default=True)
    
    # Notification Preferences
    notify_on_follow = db.Column(db.Boolean, default=True)
    notify_on_comment = db.Column(db.Boolean, default=True)
    notify_on_reaction = db.Column(db.Boolean, default=True)
    notify_on_mention = db.Column(db.Boolean, default=True)
    
    # Language Settings
    preferred_language = db.Column(db.String(10), default='en')
    auto_translate = db.Column(db.Boolean, default=True)
    
    # Theme Settings
    dark_mode = db.Column(db.Boolean, default=False)
    font_size = db.Column(db.String(20), default='medium')
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

# AI Functions
def translate_text(text, target_lang='en'):
    try:
        translation = translator.translate(text, dest=target_lang)
        return translation.text
    except:
        return text

def analyze_sentiment(text):
    try:
        sentiment = sentiment_analyzer.polarity_scores(text)
        return sentiment['compound']  # Returns a score between -1 and 1
    except:
        return 0.0

def get_content_recommendations(user_id, limit=5):
    user = User.query.get(user_id)
    if not user:
        return []
    
    # Get user's interests
    user_interests = [interest.topic for interest in user.interests]
    
    # Get all posts
    all_posts = Post.query.all()
    
    # Simple recommendation based on user interests
    recommendations = []
    for post in all_posts:
        if post.user_id != user_id:  # Don't recommend user's own posts
            # Check if post title or content contains any of user's interests
            score = sum(1 for interest in user_interests if interest.lower() in post.title.lower() or interest.lower() in post.content.lower())
            if score > 0:
                recommendations.append((post, score))
    
    # Sort by score and return top recommendations
    recommendations.sort(key=lambda x: x[1], reverse=True)
    return [post for post, score in recommendations[:limit]]

# Routes
@app.route('/')
def home():
    return render_template('home.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        user = User.query.filter_by(username=username).first()
        
        if user and user.check_password(password):
            login_user(user)
            return redirect(url_for('home'))
        flash('Invalid username or password')
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        
        if User.query.filter_by(username=username).first():
            flash('Username already exists')
            return redirect(url_for('register'))
        
        if User.query.filter_by(email=email).first():
            flash('Email already registered')
            return redirect(url_for('register'))
        
        user = User(username=username, email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        
        return redirect(url_for('login'))
    return render_template('register.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))

@app.route('/create-character', methods=['GET', 'POST'])
@login_required
def create_character():
    if request.method == 'POST':
        name = request.form.get('name')
        description = request.form.get('description')
        avatar = request.files.get('avatar')
        
        character = Character(
            name=name,
            description=description,
            user_id=current_user.id
        )
        
        if avatar:
            filename = f"character_{datetime.now().strftime('%Y%m%d%H%M%S')}_{avatar.filename}"
            avatar.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            character.avatar_url = filename
        
        db.session.add(character)
        db.session.commit()
        return redirect(url_for('my_characters'))
    
    return render_template('create_character.html')

@app.route('/my-characters')
@login_required
def my_characters():
    characters = Character.query.filter_by(user_id=current_user.id).all()
    return render_template('my_characters.html', characters=characters)

@app.route('/create-post', methods=['POST'])
@login_required
def create_post():
    title = request.form.get('title')
    content = request.form.get('content')
    space_type = request.form.get('space_type')
    character_id = request.form.get('character_id')
    image = request.files.get('image')
    music = request.files.get('music')
    video_url = request.form.get('video_url')

    post = Post(
        title=title,
        content=content,
        space_type=space_type,
        user_id=current_user.id,
        character_id=character_id if character_id else None,
        video_url=video_url
    )

    if image:
        filename = f"post_{datetime.now().strftime('%Y%m%d%H%M%S')}_{image.filename}"
        image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        post.image_url = filename

    if music:
        filename = f"music_{datetime.now().strftime('%Y%m%d%H%M%S')}_{music.filename}"
        music.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        post.music_url = filename

    db.session.add(post)
    db.session.commit()
    return redirect(url_for(space_type))

@app.route('/admin')
@login_required
def admin():
    if not current_user.is_admin:
        return redirect(url_for('home'))
    users = User.query.all()
    posts = Post.query.all()
    return render_template('admin.html', users=users, posts=posts)

@app.route('/translate', methods=['POST'])
@login_required
def translate():
    if not is_feature_enabled(current_user.id, 'translation'):
        return jsonify({'error': 'Translation feature is disabled'}), 403
    
    text = request.json.get('text')
    target_lang = request.json.get('target_lang', current_user.preferred_language)
    translated_text = translate_text(text, target_lang)
    return jsonify({'translated_text': translated_text})

@app.route('/analyze-sentiment', methods=['POST'])
@login_required
def analyze_post_sentiment():
    if not is_feature_enabled(current_user.id, 'sentiment_analysis'):
        return jsonify({'error': 'Sentiment analysis feature is disabled'}), 403
    
    text = request.json.get('text')
    sentiment_score = analyze_sentiment(text)
    return jsonify({'sentiment_score': sentiment_score})

@app.route('/recommendations')
@login_required
def get_recommendations():
    if not is_feature_enabled(current_user.id, 'content_recommendation'):
        return jsonify({'error': 'Content recommendation feature is disabled'}), 403
    
    recommendations = get_content_recommendations(current_user.id)
    return jsonify([{
        'id': post.id,
        'title': post.title,
        'content': post.content,
        'author': post.author.username,
        'created_at': post.created_at.isoformat()
    } for post in recommendations])

# Social Routes
@app.route('/follow/<int:user_id>', methods=['POST'])
@login_required
def follow_user(user_id):
    if user_id == current_user.id:
        return jsonify({'error': 'Cannot follow yourself'}), 400
    
    existing_follow = Follow.query.filter_by(
        follower_id=current_user.id,
        followed_id=user_id
    ).first()
    
    if existing_follow:
        return jsonify({'error': 'Already following this user'}), 400
    
    follow = Follow(follower_id=current_user.id, followed_id=user_id)
    db.session.add(follow)
    
    # Create notification
    notification = Notification(
        user_id=user_id,
        content=f"{current_user.username} started following you",
        type='follow',
        reference_id=current_user.id
    )
    db.session.add(notification)
    
    db.session.commit()
    return jsonify({'message': 'Successfully followed user'})

@app.route('/unfollow/<int:user_id>', methods=['POST'])
@login_required
def unfollow_user(user_id):
    follow = Follow.query.filter_by(
        follower_id=current_user.id,
        followed_id=user_id
    ).first()
    
    if follow:
        db.session.delete(follow)
        db.session.commit()
    
    return jsonify({'message': 'Successfully unfollowed user'})

@app.route('/notifications')
@login_required
def get_notifications():
    notifications = Notification.query.filter_by(
        user_id=current_user.id
    ).order_by(Notification.created_at.desc()).all()
    
    return jsonify([{
        'id': notification.id,
        'content': notification.content,
        'type': notification.type,
        'reference_id': notification.reference_id,
        'is_read': notification.is_read,
        'created_at': notification.created_at.isoformat()
    } for notification in notifications])

@app.route('/notifications/mark-read', methods=['POST'])
@login_required
def mark_notifications_read():
    notification_ids = request.json.get('notification_ids', [])
    
    for notification_id in notification_ids:
        notification = Notification.query.get(notification_id)
        if notification and notification.user_id == current_user.id:
            notification.is_read = True
    
    db.session.commit()
    return jsonify({'message': 'Notifications marked as read'})

@app.route('/group-chats', methods=['GET', 'POST'])
@login_required
def group_chats():
    if request.method == 'POST':
        name = request.json.get('name')
        description = request.json.get('description')
        
        group = GroupChat(
            name=name,
            description=description,
            creator_id=current_user.id
        )
        db.session.add(group)
        
        # Add creator as admin
        member = GroupChatMember(
            group=group,
            user_id=current_user.id,
            role='admin'
        )
        db.session.add(member)
        
        db.session.commit()
        return jsonify({'message': 'Group chat created successfully'})
    
    # GET request
    user_groups = GroupChatMember.query.filter_by(user_id=current_user.id).all()
    groups = [member.group for member in user_groups]
    
    return jsonify([{
        'id': group.id,
        'name': group.name,
        'description': group.description,
        'member_count': len(group.members),
        'created_at': group.created_at.isoformat()
    } for group in groups])

@app.route('/group-chats/<int:group_id>/messages', methods=['GET', 'POST'])
@login_required
def group_chat_messages(group_id):
    group = GroupChat.query.get_or_404(group_id)
    member = GroupChatMember.query.filter_by(
        group_id=group_id,
        user_id=current_user.id
    ).first()
    
    if not member:
        return jsonify({'error': 'Not a member of this group'}), 403
    
    if request.method == 'POST':
        content = request.json.get('content')
        
        message = GroupChatMessage(
            group_id=group_id,
            user_id=current_user.id,
            content=content
        )
        db.session.add(message)
        
        # Create notifications for other members
        for member in group.members:
            if member.user_id != current_user.id:
                notification = Notification(
                    user_id=member.user_id,
                    content=f"New message in {group.name} from {current_user.username}",
                    type='message',
                    reference_id=group_id
                )
                db.session.add(notification)
        
        db.session.commit()
        return jsonify({'message': 'Message sent successfully'})
    
    # GET request
    messages = GroupChatMessage.query.filter_by(
        group_id=group_id
    ).order_by(GroupChatMessage.created_at.desc()).limit(50).all()
    
    return jsonify([{
        'id': message.id,
        'content': message.content,
        'user_id': message.user_id,
        'username': message.user.username,
        'created_at': message.created_at.isoformat()
    } for message in messages])

# Data Analysis Functions
def track_user_activity(user_id, activity_type, reference_id=None):
    activity = UserActivity(
        user_id=user_id,
        activity_type=activity_type,
        reference_id=reference_id
    )
    db.session.add(activity)
    db.session.commit()

def analyze_user_activity(user_id, days=30):
    end_date = datetime.utcnow()
    start_date = end_date - timedelta(days=days)
    
    activities = UserActivity.query.filter(
        UserActivity.user_id == user_id,
        UserActivity.created_at >= start_date
    ).all()
    
    activity_counts = {
        'post': 0,
        'comment': 0,
        'reaction': 0,
        'follow': 0
    }
    
    for activity in activities:
        activity_counts[activity.activity_type] += 1
    
    return activity_counts

def analyze_trends():
    # Get all posts from the last 7 days
    end_date = datetime.utcnow()
    start_date = end_date - timedelta(days=7)
    
    posts = Post.query.filter(
        Post.created_at >= start_date
    ).all()
    
    # Extract topics from post titles and content
    topics = []
    for post in posts:
        topics.extend(post.title.split())
        topics.extend(post.content.split())
    
    # Count topic frequency
    topic_counts = {}
    for topic in topics:
        if len(topic) > 3:  # Ignore short words
            topic_counts[topic] = topic_counts.get(topic, 0) + 1
    
    # Create trend analysis entries
    for topic, count in topic_counts.items():
        if count >= 5:  # Only track topics mentioned at least 5 times
            trend = TrendAnalysis(
                topic=topic,
                score=count
            )
            db.session.add(trend)
    
    db.session.commit()

def generate_insight_report(report_type='daily'):
    if report_type == 'daily':
        start_date = datetime.utcnow() - timedelta(days=1)
    elif report_type == 'weekly':
        start_date = datetime.utcnow() - timedelta(days=7)
    else:  # monthly
        start_date = datetime.utcnow() - timedelta(days=30)
    
    # Get activity statistics
    total_posts = Post.query.filter(Post.created_at >= start_date).count()
    total_comments = Comment.query.filter(Comment.created_at >= start_date).count()
    total_reactions = Reaction.query.filter(Reaction.created_at >= start_date).count()
    
    # Get top trending topics
    trends = TrendAnalysis.query.filter(
        TrendAnalysis.created_at >= start_date
    ).order_by(TrendAnalysis.score.desc()).limit(5).all()
    
    # Generate report content
    content = f"""
    Activity Summary:
    - New Posts: {total_posts}
    - New Comments: {total_comments}
    - New Reactions: {total_reactions}
    
    Top Trending Topics:
    {chr(10).join([f"- {trend.topic} (Score: {trend.score})" for trend in trends])}
    """
    
    report = InsightReport(
        title=f"{report_type.capitalize()} Activity Report",
        content=content,
        report_type=report_type
    )
    db.session.add(report)
    db.session.commit()
    
    return report

# Data Analysis Routes
@app.route('/analytics/user/<int:user_id>')
@login_required
def user_analytics(user_id):
    if not current_user.is_admin and current_user.id != user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    activity_data = analyze_user_activity(user_id)
    return jsonify(activity_data)

@app.route('/analytics/trends')
@login_required
def get_trends():
    if not current_user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403
    
    trends = TrendAnalysis.query.order_by(
        TrendAnalysis.created_at.desc()
    ).limit(10).all()
    
    return jsonify([{
        'topic': trend.topic,
        'score': trend.score,
        'created_at': trend.created_at.isoformat()
    } for trend in trends])

@app.route('/analytics/reports')
@login_required
def get_reports():
    if not current_user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403
    
    reports = InsightReport.query.order_by(
        InsightReport.created_at.desc()
    ).limit(10).all()
    
    return jsonify([{
        'title': report.title,
        'content': report.content,
        'type': report.report_type,
        'created_at': report.created_at.isoformat()
    } for report in reports])

# Schedule periodic tasks
def schedule_tasks():
    # Analyze trends every 6 hours
    scheduler.add_job(analyze_trends, 'interval', hours=6)
    
    # Generate daily report at midnight
    scheduler.add_job(generate_insight_report, 'cron', hour=0, minute=0, args=['daily'])
    
    # Generate weekly report on Sunday
    scheduler.add_job(generate_insight_report, 'cron', day_of_week='sun', hour=0, minute=0, args=['weekly'])
    
    # Generate monthly report on the 1st
    scheduler.add_job(generate_insight_report, 'cron', day=1, hour=0, minute=0, args=['monthly'])
    
    scheduler.start()

# Settings Routes
@app.route('/settings', methods=['GET', 'POST'])
@login_required
def user_settings():
    if request.method == 'POST':
        settings = UserSettings.query.filter_by(user_id=current_user.id).first()
        if not settings:
            settings = UserSettings(user_id=current_user.id)
        
        # Update settings from form data
        settings.enable_translation = request.form.get('enable_translation') == 'true'
        settings.enable_sentiment_analysis = request.form.get('enable_sentiment_analysis') == 'true'
        settings.enable_content_recommendation = request.form.get('enable_content_recommendation') == 'true'
        settings.enable_notifications = request.form.get('enable_notifications') == 'true'
        settings.enable_group_chat = request.form.get('enable_group_chat') == 'true'
        settings.enable_follow_system = request.form.get('enable_follow_system') == 'true'
        settings.enable_push_notifications = request.form.get('enable_push_notifications') == 'true'
        settings.enable_offline_mode = request.form.get('enable_offline_mode') == 'true'
        settings.enable_activity_tracking = request.form.get('enable_activity_tracking') == 'true'
        settings.enable_trend_analysis = request.form.get('enable_trend_analysis') == 'true'
        settings.show_online_status = request.form.get('show_online_status') == 'true'
        settings.show_activity_status = request.form.get('show_activity_status') == 'true'
        settings.allow_data_collection = request.form.get('allow_data_collection') == 'true'
        settings.notify_on_follow = request.form.get('notify_on_follow') == 'true'
        settings.notify_on_comment = request.form.get('notify_on_comment') == 'true'
        settings.notify_on_reaction = request.form.get('notify_on_reaction') == 'true'
        settings.notify_on_mention = request.form.get('notify_on_mention') == 'true'
        settings.preferred_language = request.form.get('preferred_language')
        settings.auto_translate = request.form.get('auto_translate') == 'true'
        settings.dark_mode = request.form.get('dark_mode') == 'true'
        settings.font_size = request.form.get('font_size')
        
        db.session.add(settings)
        db.session.commit()
        
        return jsonify({'message': 'Settings updated successfully'})
    
    # GET request
    settings = UserSettings.query.filter_by(user_id=current_user.id).first()
    if not settings:
        settings = UserSettings(user_id=current_user.id)
        db.session.add(settings)
        db.session.commit()
    
    return render_template('settings.html', settings=settings)

# Feature Toggle Functions
def is_feature_enabled(user_id, feature_name):
    settings = UserSettings.query.filter_by(user_id=user_id).first()
    if not settings:
        return True  # Default to enabled if no settings exist
    
    feature_map = {
        'translation': settings.enable_translation,
        'sentiment_analysis': settings.enable_sentiment_analysis,
        'content_recommendation': settings.enable_content_recommendation,
        'notifications': settings.enable_notifications,
        'group_chat': settings.enable_group_chat,
        'follow_system': settings.enable_follow_system,
        'push_notifications': settings.enable_push_notifications,
        'offline_mode': settings.enable_offline_mode,
        'activity_tracking': settings.enable_activity_tracking,
        'trend_analysis': settings.enable_trend_analysis
    }
    
    return feature_map.get(feature_name, True)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
