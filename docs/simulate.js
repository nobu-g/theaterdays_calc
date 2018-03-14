function simulate(notes) {
    for (const note of notes) {
        document.write(typeof(note.next) + '<br>');
    }
}
