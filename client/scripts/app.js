// YOUR CODE HERE:

var app = {
  server: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages',
  rooms: {},
  friends: [],
  currentRoom: '',
  messages: [],
  lastMessageID: 0

};


//display messages retrieved from the parse server

app.init = function() {
  $('#chats').on('click', '.username', app.handleUsernameClick);
  $('.submit').on('click', app.handleSubmit);
  $('#roomSelect').on('change', app.handleRoomChange);
};

app.fetch = function() {
  $.ajax({
    url: app.server,
    type: 'GET',
    data: {},
    contentType: 'application/json',
    success: function(data) {
      //console.log('chatterbox: Message received', data);
      if (!data.results || !data.results.length) {
        return;
      }
      app.messages = data.results;

      var mostRecentMessage = app.messages[app.messages.length - 1];

      if (mostRecentMessage.objectId !== app.lastMessageID) {
        app.renderMessage(app.messages);
        app.renderRoomList(app.messages);
      }
    },
    error: function(data) {
      console.error('Error!', data);
    }
  });
};

//setInterval(function() { app.fetch(); }, 10000);
app.fetch();

app.send = function(message) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent', data);
      $('#message').val('');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.clearMessages = function() {
  $('#chats').html('');
};

app.renderMessage = function(message) {
  app.clearMessages();
  for (var i = 0; i < message.length; i++) {
    var currentMessage = message[i].text;
    var currentUserName = message[i].username;
    var $chat = $('<div class="chat"><span class= "username"> ' + currentUserName + '</span><br><span>' + currentMessage + '</span></div>');

    $('#chats').prepend($chat);
  }
};


app.handleUsernameClick = function(e) {
  //e.preventDefault();
  var username = e.target.innerText;
  var slicedUsername = username.slice(0, -2);

  if (username !== undefined) {
    app.friends[slicedUsername] = !app.friends[slicedUsername];
  }

  $('.username').each(function() {
    if (this.innerText === username) {
      $(this).toggleClass('friend');
    }
  });

};

app.handleSubmit = function(e) {
  e.preventDefault();
  var message = {
    text: $('#message').val(),
    username: window.location.search.slice(10),
    roomname: app.roomname || 'lobby'
  };
  app.send(message);

  var $chat = $('<div class="chat"><span class= "username"> ' + message.username + '<span><br><span>' + message.text + '</span></div>');
  $('#chats').prepend($chat);
};


app.renderRoomList = function(messages){
  $('#roomSelect').html('<option vlaue="_newRoom">New Room...</option></select>');
  if(messages){
    messages.forEach(function(message){
      var roomname = message.roomname;
      if(roomname && !app.rooms[roomname]){
        app.renderRoom(roomname);
        app.rooms[roomname] = true;
      }
    });
  }
  $('#roomSelect').val(app.roomname);
};

app.renderRoom = function(roomname) {
  var option = $('<option/>').val(roomname).text(roomname);
  $('#roomSelect').append(option);
};

app.handleRoomChange = function (e) {
  var selectIndex = $('#roomSelect').prop('selectedIndex');
    if(selectIndex === 0) {
      var roomname = prompt('Enter room name');

      if(roomname){
        app.roomname = roomname;
        app.renderRoom(roomname);
        $('#roomSelect').val(roomname);
      }
    } else {
      app.roomname = $('#roomSelect').val();
    }
    app.renderMessage(app.messages);
};
















