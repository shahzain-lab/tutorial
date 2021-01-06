import { createServer, Model, hasMany, belongsTo} from "miragejs"

export default function () {
  return createServer({
    models:{
        list: Model.extend({
           reminder: hasMany() 
        }),
        reminder: Model.extend({
            list: belongsTo()
        }),
    },
    seeds(server) {
        server.create("reminder", { text: "Walk the dog" })
        server.create("reminder", { text: "Take out the trash" })
        server.create("reminder", { text: "Work out" })

        server.create('list', {name: 'zain'})
        server.create('list', {name: 'zainZ'})
      },
    routes() {
      this.get("/api/reminders", (schema) => {
          return schema.reminders.all()
      })

     this.post('/api/reminders',(schema,request) => {
         let attrs = JSON.parse(request.requestBody)
         return schema.reminders.create(attrs)
     })
     this.delete('api/reminders/:id',(schema,request) => {
        let id = request.params.id 
        return schema.reminders.find(id).destroy()
     })
     ////Lists
     this.get('/api/lists',(schema,request) => {
         return schema.lists.all()
     })
    },
  })
}