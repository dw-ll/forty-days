import React from "react";
import { activeTab, idleTab } from "../libs/tabs";

const Notes = (props) => {
  return (
    <div class="notes w-screen py-8 px-12">
      <div class="max-w-sm mb-2 w-screen">
        <ul class="flex">
          <li class="-mb-px mr-1 cursor-pointer" onClick={() => props.setCurrentTab(false)}>
            <a class={!props.currentTab ? activeTab : idleTab}>You</a>
          </li>
          <li class="mr-1 cursor-pointer" onClick={() => props.setCurrentTab(true)}>
            <a class={props.currentTab ? activeTab : idleTab}>Us</a>
          </li>
        </ul>
      </div>
      <h1 class="text-xl sm:text-2xl lg:text-4xl w-full font-bold border-b-2">
        {!props.currentTab ? "Your Notes" : "Our Notes"}
      </h1>
      <div class="items-center justify-center w-full py-8">
        <div class="overflow-hidden bg-white rounded w-full shadow-lg leading-normal">
          {!props.isLoading &&
            props.renderNoteList(props.allNotes, props.notes)}
        </div>
      </div>
    </div>
  );
};

export default Notes;
