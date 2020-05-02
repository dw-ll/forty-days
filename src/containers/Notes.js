import React, { useState } from "react";
import { activeTab, idleTab } from "../libs/tabs";
import { NoteHeaderSkeleton, NoteSkeleton, TabSkeleton } from "./NoteSkeleton";
import noteStyle from "../styles/noteStyle";
import Loader from 'react-loaders'
var allResults = [],
  userResults = [];
const Notes = (props) => {
  const [searchFlag, setSearchFlag] = useState(false);
  const [searching, setSearching] = useState(false);

  const searchChangeHandler = e => {
    setSearching(true);
    if (e.target.value === '') {
      setSearching(false);
      setSearchFlag(false);
    } if (e.target.value.length < 3) {
      setSearchFlag(false);
    } else {
      setSearchFlag(true);
      userResults = noteSearch(e, props.notes);
      allResults = noteSearch(e, props.allNotes);
      setSearching(false);
      if (!userResults || !allResults) {
        setSearchFlag(false);
      }
    }
  }
  function noteSearch(e, notes) {
    let query = e.target.value.toLowerCase();
    return (notes.filter(note => note.content.toLowerCase().includes(query) || note.title.toLowerCase().includes(query)));

  }

  return (
    <div class={noteStyle.container}>
      <div class={noteStyle.wrapper}>
        {props.isLoading ? (
          <TabSkeleton />
        ) : (
            <ul class="flex">
              <li
                class={noteStyle.tab}
                onClick={() => props.setCurrentTab(false)}
              >
                <a class={!props.currentTab ? activeTab : idleTab}>You</a>
              </li>
              <li class={noteStyle.tab} onClick={() => props.setCurrentTab(true)}>
                <a class={props.currentTab ? activeTab : idleTab}>Us</a>
              </li>
            </ul>
          )}
      </div>
      <div class="flex">
        <h1 class={noteStyle.header}>
          {props.isLoading ? (
            <NoteHeaderSkeleton />
          ) : !props.currentTab ? (
            "Your Notes"
          ) : (
                "Our Notes"
              )}
        </h1>
      </div>


      <div class="relative py-4 ">
        <input class="block border border-grey-light w-full sm:w-1/2 lg:w-1/4 p-3 rounded mb-2 border border-grey-light" placeholder="Search" onChange={searchChangeHandler} >
        </input>
      </div>


      {props.isLoading ? (
        <NoteSkeleton />
      ) : (
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {searching ?
              <Loader type="ball-grid-beat" active /> :
              props.renderNoteList(searchFlag ? allResults : props.allNotes,
                searchFlag ? userResults : props.notes,
                props.skeleton)}

          </div>
        )}
    </div>
  );
};

export default Notes;
