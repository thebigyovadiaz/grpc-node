const grpc = require("grpc");
const notesProto = grpc.load("notes.proto");
const { v1: uuidv1 } = require("uuid");

const notes = [
  { id: '1', title: "Note 1", content: "Content 1" },
  { id: '2', title: "Note 2", content: "Content 2" },
];

const server = new grpc.Server();

server.addService(notesProto.NoteService.service, {
  list: (_, callback) => {
    callback(null, notes);
  },
  insert: (call, callback) => {
    let note = call.request;
    note.id = uuidv1();
    notes.push(note);
    callback(null, note);
  },
  delete: (call, callback) => {
    let existNoteId = notes.findIndex((n) => n.id == call.request.id);

    if (existNoteId === -1) {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Not Found"
      })
    }

    notes.splice(existNoteId, 1);
    callback(null, {});
  }
});

server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
console.log("Server running at http://127.0.0.1:50051");
server.start();
