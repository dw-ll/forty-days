import React from "react";
import { activeTab, idleTab } from "../libs/tabs";
import { NoteHeaderSkeleton, NoteSkeleton, TabSkeleton } from "./NoteSkeleton";
import noteStyle from "../styles/noteStyle";

const Notes = (props) => {
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
      <div class='flex'>
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
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 ">
        {props.isLoading ? (
          <NoteSkeleton notes={props.notes} />
        ) : (
          props.renderNoteList(props.allNotes, props.notes, props.skeleton)
        )}
      </div>
    </div>
  );
};

export default Notes;
