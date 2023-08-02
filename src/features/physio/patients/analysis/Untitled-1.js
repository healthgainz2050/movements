const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://<your_supabase_url>.supabase.co';
const supabaseKey = '<your_supabase_key>';
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();

app.get('/user/:id', async (req, res) => {
  const { id } = req.params;

  const { data: user, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  const { data: skills, error: skillsError } = await supabase
    .from('skills')
    .select('*')
    .eq('user_id', id);

  const { data: experience, error: experienceError } = await supabase
    .from('experience')
    .select('*')
    .eq('user_id', id);

  const { data: education, error: educationError } = await supabase
    .from('education')
    .select('*')
    .eq('user_id', id);

  if (userError || skillsError || experienceError || educationError) {
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }

  const stats = {
    applied: user.applied,
    reviewed: user.reviewed,
  };

  const about = {
    title: user.about_title,
    description: user.about_description,
  };

  const userSkills = skills.map(skill => skill.skill);

  const skillsObj = {
    title: user.skills_title,
    skills: userSkills,
  };

  const experiences = experience.map(exp => ({
    icon: exp.icon,
    title: exp.title,
    description: exp.description,
  }));

  const educationItems = education.map(edu => ({
    icon: edu.icon,
    title: edu.title,
    description: edu.description,
  }));

  const responseObject = {
    coverImage: user.cover_image,
    avatar: user.avatar,
    name: user.name,
    status: user.status,
    tagline: user.tagline,
    stats,
    about,
    skills: skillsObj,
    experience: {
      title: 'Experience',
      experiences,
    },
    education: {
      title: 'Education',
      education: educationItems,
    },
  };

  res.json(responseObject) 
}
