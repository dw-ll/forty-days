export default function noteSearch(e, notes, allNotes) {
    let query = e.target.value.toLowerCase();
    return (notes.filter(note => note.content.toLowerCase().includes(query) || note.title.toLowerCase().includes(query)),
        allNotes.filter(note => note.content.toLowerCase().includes(query) || note.title.toLowerCase().includes(query)));

}