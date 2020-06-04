"use strict";

var socket = io();
window.addEventListener('load', function () {
  var currentMessage = '';
  var form = document.querySelector('.chat-form');
  var messageInput = form.querySelector('#message');
  var typeIndicator = document.querySelector('.type-indicator');
  var statusIndicator = document.querySelector('.status-indicator');
  submit();
  type();
  status();

  function submit() {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var message = messageInput.value;

      if (message === '') {
        return;
      }

      socket.emit('chat message', message);
      renderChat('send', message);
      form.reset();
    });
    socket.emit('user connected');
    socket.on('chat message', function (message) {
      renderChat('receive', message);
    });
    socket.on('user typing', function (message) {
      if (!document.querySelector('.typing')) {
        typeIndicator.classList.add('active');
        setTimeout(function () {
          typeIndicator.classList.remove('active');
        }, 2000);
      } else {
        typeIndicator.classList.remove('active');
      }
    });
  }

  function type() {
    form.addEventListener('input', function (event) {
      event.preventDefault();

      if (event.inputType.includes('delete')) {
        return;
      }

      if (event.target.value !== '') {
        socket.emit('user typing');
      }
    });
  }

  function renderChat(method, message) {
    var chatWindow = document.querySelector('.chat-window');
    var newMessage = document.createElement('div');
    newMessage.classList.add('chat-message');
    newMessage.classList.add(method);
    newMessage.innerHTML = "\n\t<p>".concat(message.toString(), "</p>\n\t");

    if (method === 'receive') {
      typeIndicator.classList.remove('active');
      typeIndicator.addEventListener('transitionend', function () {
        chatWindow.appendChild(newMessage);
        newMessage.classList.add('active');
      });
    } else {
      chatWindow.appendChild(newMessage);
      newMessage.classList.add('active');
    }
  }

  function status() {
    socket.on('user online', function (status) {
      return status === true ? statusIndicator.classList.add('active') : statusIndicator.classList.remove('active');
    });
  }
});