// controllers/auth/profileViewController.js
const profileViewController = {};

// Render the profile page
profileViewController.show = (req, res) => {
  const { user, userPosts, likedPosts, userComments } = res.locals.data;
  
  res.render('auth/Profile', {
    user,
    userPosts,
    likedPosts,
    userComments,
    currentUser: req.author // For consistency with other views
  });
};

// Render the edit profile page
profileViewController.edit = (req, res) => {
  res.render('auth/EditProfile', {
    user: req.author,
    currentUser: req.author
  });
};

// Redirect to profile after update
profileViewController.redirectToProfile = (req, res) => {
  res.redirect('/profile');
};

module.exports = profileViewController;