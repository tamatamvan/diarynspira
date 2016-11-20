var app = new Vue({
  el: '#app',
  data: {
    authenticated: false,
    regstat: false,
    auth_failed: false,
    stories: [],
    authmode: 'up',
    //MPRIT
    name: '',
    username: '',
    ava: '',
    email: '',
    password: '',

    title: '',
    content: '',

    edittitle: '',
    editcontent: '',

    ses_name: '',
    ses_username: '',
    ses_ava: '',
    ses_email: '',
    token: ''
  },
  methods: {
    setauthin: function() {
      app.authmode = 'in'
    },
    setauthup: function() {
      app.authmode = 'up'
    },
    loadStories : function() {
      axios.get('http://localhost:3000/api/stories', {})
      .then(function (response) {
        app.stories = response.data.reverse();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    postNewStory: function() {
      axios.post('http://localhost:3000/api/stories',{
        title: app.title,
        content: app.content,
        author: app.ses_username,
        authorAva: app.ses_ava
      })
      .then(function (response) {
        app.stories.unshift(response.data)
        app.clearModel()
      })
      .catch(function(error) {
        console.log(error);
      })
    },
    setmodeledit: function(slug) {
      axios.get('http://localhost:3000/api/stories/'+slug, {})
      .then(function(response){
        console.log(response);
        app.edittitle = response.data.title,
        app.editcontent = response.data.content
      })
      .catch(function(error) {
        console.log(error);
      })
    },
    updateStory: function(id) {
      axios.put('http://localhost:3000/api/stories/'+id, {
        title: app.edittitle,
        content: app.editcontent,
        author: app.ses_username,
        authorAva: app.ses_ava
      })
      .then(function(response){
        app.loadStories()
      })
      .catch(function(error) {
        console.log(error);
      })
    },
    deleteStory: function(id) {
      axios.delete('http://localhost:3000/api/stories/'+id, {})
      .then(function(response) {
        app.loadStories()
      })
      .catch(function(error) {
        console.log(error);
      })
    },

    register: function(id) {
      axios.post('http://localhost:3000/auth/register', {
        name: app.name,
        username: app.username,
        email: app.email,
        password: app.password,
        avatar_url: app.ava
      })
      .then(function(response) {
        alert('Your registration was successful!')
        app.regstat = true
        app.clearModel()
      })
      .catch(function(error) {
        console.log(error);
      })
    },
    login: function() {
      axios.post('http://localhost:3000/auth/login', {
        username: app.username,
        password: app.password
      })
      .then(function(response) {
        if (response.data.username != undefined) {
          console.log(JSON.stringify(response));
          localStorage.setItem('authenticated', true)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('ses_username', response.data.username)
          localStorage.setItem('ses_name', response.data.name)
          localStorage.setItem('ses_ava', response.data.avatar_url)
          app.checkAuth()
          app.clearModel()
        } else {
          app.auth_failed=true;
        }
      })
      .catch(function(error) {
        console.log(error);
      })
    },
    logout: function() {
      localStorage.removeItem('token')
      localStorage.removeItem('ses_username')
      localStorage.removeItem('ses_name')
      localStorage.removeItem('ses_ava')
      localStorage.removeItem('authenticated')

      app.authenticated = false;
      app.ses_name = '';
      app.ses_username = '';
      app.ses_ava = '';
      app.token = '';
    },
    checkAuth: function() {
      app.authenticated = localStorage.getItem('authenticated')
      app.token = localStorage.getItem('token')
      app.ses_username = localStorage.getItem('ses_username')
      app.ses_name = localStorage.getItem('ses_name')
      app.ses_ava = localStorage.getItem('ses_ava')
    },
    falseregstat: function() {
      app.regstat = false;
    },
    falseauthfailed: function() {
      app.auth_failed = false;
    },
    clearModel: function(){
      app.name = '';
      app.username = '';
      app.ava = '';
      app.title = '';
      app.content = '';
      app.email = '';
      app.editcontent = '';
      app.edittitle = '';
      app.password = '';
    }
  }
})

app.loadStories();
app.checkAuth();
