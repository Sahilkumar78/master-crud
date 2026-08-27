import { Note } from "../models/Note.js"


const getAllNotes = async (req, res) => { 
     
try {
      const notes=    await Note.find();
     res.status(200).json(notes);
} catch (error) {
      console.log("Error while fetching notes", error);

      
}
}

const creatNote =async (req, res) => {

        try {
           
          const {title, content} = req.body;
           
         const newNote=  await Note.create({title, content});
          
         res.status(201).json({
            note: newNote,
            message: "Note created successfully"
        });
        } catch (error) {
          console.log("Error while creating note is:", error);
          res.status(500).json({
               message: "Internal server error"
          })  
        }
}

const updateNote = async (req, res) => {
     
   try {
     
            const {title, content} = req.body;
       const {id} = req.params;
     const updatedNote= await Note.findByIdAndUpdate(id, {title, content});
    
       res.status(200).json({
           message: "note updated successfully",
           note: updatedNote
       })
   } catch (error) {
     console.log("Error while updating note: ", error);
     res.status(500).json({
          message: "internal server error"
     })
   }

}

const deleteNote = async (req, res) => {
      
      
     try {

          const {id} = req.params;
          console.log("id for deletion is: ",id);

        const deletedNote=   await Note.findByIdAndDelete(id);
          
        res.status(200).json({
           message: "note updated successfully",
           note: deletedNote
        })
          
     } catch (error) {
          console.log("Error while deleting note is: ", error);
          res.status(500).json({
               message: "Internal server error"
          })
     }
}


export {getAllNotes, creatNote, updateNote, deleteNote}