const client = require("./client");

client.delete({ id: "a3afb5d0-edb0-11ea-93b5-bb12885c2045" }, (error, _) => {
  if (error) {
    console.error(error);
  }

  console.log("Note has been successfully deleted");
});
