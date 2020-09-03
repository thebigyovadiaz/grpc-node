const client = require("./client");

client.delete({ id: '4' }, (error, _) => {
  if (error) {
    console.error(error);
  }

  console.log('Note has been successfully deleted')
})
