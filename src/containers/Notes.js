import React, { useState } from "react";
import { activeTab, idleTab } from "../libs/tabs";
import noteSearch from '../libs/search';
import { NoteHeaderSkeleton, NoteSkeleton, TabSkeleton } from "./NoteSkeleton";
import noteStyle from "../styles/noteStyle";
var allResults = [],
  userResults = [];
const Notes = (props) => {
  const [searchFlag, setSearchFlag] = useState(false);
  const [value, setValue] = useState('');
  const searchChangeHandler = e => {
    if (e.target.value === '' || e.target.value.length < 4) {

      setSearchFlag(false);
    } else {
      setSearchFlag(true);
      [userResults, allResults] = noteSearch(e, props.notes, props.allNotes);
      console.log(userResults);
      console.log(allResults);
      if (!userResults || !allResults) {
        setSearchFlag(false);
      }
    }
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
        <input type="search" class="shadow-md rounded border-0 p-3 w-full sm:w-1/2 lg:w-1/4" placeholder="Search" onChange={searchChangeHandler} >
        </input>
      </div>


      {props.isLoading ? (
        <NoteSkeleton notes={props.notes} />
      ) : (
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {props.renderNoteList(searchFlag ? allResults : props.allNotes, searchFlag ? userResults : props.notes, props.skeleton)}
          </div>
        )}
    </div>
  );
};

export default Notes;
