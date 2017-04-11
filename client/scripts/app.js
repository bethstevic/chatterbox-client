// YOUR CODE HERE:

var app = {
  server: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages',
  rooms: {},
  friends: [],
  currentRoom: '',
  messages: []

};


//display messages retrieved from the parse server

app.init = function() {
  $('.username').on('click', app.handleUsernameClick());
  $('.submit').on('click', app.handleSubmit());
};

app.fetch = function(message) {
  $.ajax({
    url: app.server,
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function(data) {
      console.log('chatterbox: Message received');
    },
    error: function(data) {
      console.error('Error!', data);
    }
  });
};

app.send = function(message) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.clearMessages = function() {
  $('#chats').children().remove();
};

app.renderMessage = function(message) {
  $('#chats').append('<p>' + message + '</p>');

};

app.renderRoom = function(room) {
  $('#roomSelect').append('<span>' + room + '</span>');
};


app.handleUsernameClick = function() {
  // $('.username').on('click', function() {
  //   app.friends.push(userName);
  // });
};

app.handleSubmit = function() {

};

//protect against XSS attacks

//Set up a way to refresh displayed messages, either automatically or with a button

//Allow users to select a user name and be able to send messages


//Allow users to create rooms and enter existing rooms

//Allow users to 'befriend' other users by clicking on their user name

//Display all messages sent by friends in bold














