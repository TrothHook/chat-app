function formatMessage(username, text) {
  return {
    username,
    text,
    time: new Date().toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: 'numeric'
    })
  };
}

module.exports = formatMessage;
