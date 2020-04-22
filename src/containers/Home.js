import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import Landing from "./Landing";
import Notes from "./Notes";
import NoteModal from "./NoteModal";
import NoteList from "./NoteList";
import noteSort from "../libs/sort";

const Home = (props) => {
  const [notes, setNotes] = useState([]);
  const [allNotes, setAllNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [noteModal, setNoteModal] = useState(false);
  const [currentTab, setCurrentTab] = useState(false);
  const [skeleton, setSkeleton] = useState(false);

  useEffect(() => {
    async function onLoad() {
      if (!props.authenticatedUser) {
        return;
      }
      setIsloading(true);
      setSkeleton(true);
      try {
        const notes = await loadNotes();
        const allNotes = await loadAllNotes();

        notes.sort(function (a, b) {
          return noteSort(a, b);
        });
        allNotes.sort(function (a, b) {
          return noteSort(a, b);
        });
        setNotes(notes);
        setAllNotes(allNotes);
      } catch (e) {
        alert(e);
      }
      setIsloading(false);
      setSkeleton(false);
    }
    onLoad();
  }, [props.authenticatedUser]);

  const loadNotes = () => {
    return API.get("notes", "/notes");
  };
  const loadAllNotes = () => {
    return API.get("notes", "/notes/all");
  };
  const toggleNoteModal = (note) => {
    setNoteModal(!noteModal);
    setCurrentNote(note);
  };

  const renderModal = (note) => {
    return (
      <NoteModal
        setNoteModal={setNoteModal}
        note={note}
        currentTab={currentTab}
      />
    );
  };

  const renderNoteList = (allNotes, notes, skeleton) => {
    return (
      <NoteList
        allNotes={allNotes}
        currentNote={currentNote}
        currentTab={currentTab}
        notes={notes}
        noteModal={noteModal}
        renderModal={renderModal}
        skeleton={skeleton}
        toggleNoteModal={toggleNoteModal}
      />
    );
  };

  const renderLanding = () => {
    return <Landing />;
  };
  const renderNotes = () => {
    return (
      <Notes
        allNotes={allNotes}
        currentTab={currentTab}
        isLoading={isLoading}
        notes={notes}
        renderNoteList={renderNoteList}
        skeleton={skeleton}
        setCurrentTab={setCurrentTab}
      />
    );
  };
  return (
    <div class="home">
      {props.authenticatedUser ? renderNotes() : renderLanding()}
    </div>
  );
};
export default Home;
