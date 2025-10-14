-- MindEase Database Schema
-- Create Database
CREATE DATABASE IF NOT EXISTS mindease_db;
USE mindease_db;

-- Table 1: Users (Admin Login)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 2: Affirmations
CREATE TABLE IF NOT EXISTS affirmations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    affirmation_text TEXT NOT NULL,
    category VARCHAR(50) DEFAULT 'general',
    is_default BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 3: Favorites (User's Saved Affirmations)
CREATE TABLE IF NOT EXISTS favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_session VARCHAR(100),
    affirmation_id INT,
    affirmation_text TEXT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (affirmation_id) REFERENCES affirmations(id) ON DELETE CASCADE
);

-- Table 4: Resources (Articles & Videos)
CREATE TABLE IF NOT EXISTS resources (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    type ENUM('article', 'video') NOT NULL,
    description TEXT,
    url VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 5: Feedback (Contact Form Submissions)
CREATE TABLE IF NOT EXISTS feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'responded') DEFAULT 'new',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Default Admin User
-- Password: admin123 (You should change this!)
INSERT INTO users (username, password, email) VALUES 
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@mindease.com');

-- Insert Default Affirmations
INSERT INTO affirmations (affirmation_text, category, is_default) VALUES
('I am worthy of love and respect', 'self-love', 1),
('Every breath I take fills me with calm and peace', 'relaxation', 1),
('I release all tension and embrace tranquility', 'stress-relief', 1),
('My mind is clear, my heart is open', 'mindfulness', 1),
('I choose positivity and gratitude today', 'positivity', 1),
('I am stronger than my anxiety', 'anxiety', 1),
('I trust the journey of my life', 'confidence', 1),
('Today, I focus on what I can control', 'control', 1),
('I am proud of how far I have come', 'self-love', 1),
('Peace begins with me', 'mindfulness', 1);

-- Insert Sample Resources
INSERT INTO resources (title, type, description, url) VALUES
('Understanding Anxiety: A Beginner\'s Guide', 'article', 'Learn about anxiety symptoms, causes, and coping strategies.', 'https://www.nimh.nih.gov/health/topics/anxiety-disorders'),
('10-Minute Guided Meditation for Stress Relief', 'video', 'A calming meditation session to reduce stress and promote relaxation.', 'https://www.youtube.com/watch?v=inpok4MKVLM'),
('The Science of Mindfulness', 'article', 'Discover how mindfulness practices can improve mental health.', 'https://www.apa.org/topics/mindfulness/meditation'),
('Breathing Exercises for Anxiety', 'video', 'Simple breathing techniques to calm your nervous system.', 'https://www.youtube.com/watch?v=tybOi4hjZFQ'),
('Mental Health Helplines & Support', 'article', 'List of emergency contacts and support services for mental health.', 'https://www.mentalhealth.gov/get-help/immediate-help'),
('How to Build a Daily Mindfulness Practice', 'article', 'Step-by-step guide to incorporating mindfulness into your routine.', 'https://www.headspace.com/meditation/mindfulness');

-- Sample Feedback Entry
INSERT INTO feedback (name, email, message, status) VALUES
('Demo User', 'demo@example.com', 'Thank you for this wonderful platform! It has really helped me manage my stress.', 'new');