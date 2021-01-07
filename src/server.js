import { createServer, Model,RestSerializer,Factory ,hasMany, belongsTo} from "miragejs"

export default function () {
  return createServer({
      serializers:{
          reminder: RestSerializer.extend({
              include: ['list'],
              embed: true
          })
      },
    models:{
        list: Model.extend({
           reminders: hasMany() 
        }),
        reminder: Model.extend({
            list: belongsTo()
        }),
    },
    factories: {
        list: Factory.extend({
           name(i){
               return `List ${i}`
           }
        }),
      reminder: Factory.extend({
          text(i){
              return `Reminder ${i}`
          }
      })
    },
    seeds(server) {
        server.createList("reminder",3)
           
        let homeList = server.create("list", { name: "Home" });
  server.create("reminder", { list: homeList, text: "Do taxes" });

  let workList = server.create("list", { name: "Work" });
  server.create("reminder", { list: workList, text: "Visit bank" });
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
     ///relationship
     this.get('/api/lists/:id/reminders',(schema,request) => {
         let listId = request.params.id
         let list = schema.lists.find(listId)

         return list.reminders
     })
    },
  })
}