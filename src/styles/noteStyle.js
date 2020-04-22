const noteStyle = {
  container: "notes w-screen py-8 px-12",
  wrapper: "max-w-sm mb-2 w-screen",
  tab: "mr-1 cursor-pointer",
  header: "text-xl sm:text-2xl lg:text-4xl w-full font-bold border-b-2",
  listContainer: "items-center justify-center w-full py-8",
  listWrapper:
    "overflow-hidden bg-white rounded w-full shadow-lg leading-normal",
  createNoteButtonWrapper: "block group hover:bg-gray-300 p-4 border-b",

  createNoteButtonText:
    "font-bold text-lg mb-1 text-black group-hover:text-white",
  createNote: {
    wrapper: "flex mb-4 h-screen",
    leftHalf: {
      wrapper: "hidden lg:flex w-1/2 py-12 h-full bg-gray-400",
      formWrapper: "max-w-full max-w-xs",
      form: "px-16 py-8 mb-4 lg:min-w-full",
      card: "max-wm-sm rounded shadow-lg mt-12 bg-gray-100 lg:min-w-full",
      contentWrapper: "px-6 py-4",
      noteTitle: "font-bold text-2x pt-4",
      noteContent: "text-gray-700 text-base mt-8",
    },
    rightHalf: {
      wrapper:
        "right-half lg:h-full w-screen lg:w-1/2 px-8 mdlandscape:overflow-y-scroll lg:px-0 bg-gray-500",
      formWrapper:
        "form-wrapper max-w-full max-w-xs  mdlandscape:max-h-screen py-6 md:ml-8 lg:py-12 lg:ml-0 xl:ml-18 xxl:ml-18",
      form:
        "px-2 mdlandscape:py-0 md:px-16 max-h-1/2 md:py-8 md:mb-4 lg:px-12 lg:min-w-full",
      card:"md:max-h-1/2 rounded overflow-hidden shadow-lg mt-12 bg-gray-300 lg:w-full",
      
    },
  },
  notePreview:
    "block group hover:bg-gray-300 p-4 border-b w-full cursor-pointer",
  notePreviewTitle: "font-bold text-lg mb-1 text-black group-hover:text-white",
  notePreviewContent: "text-grey-darker mb-2 group-hover:text-white",
  notePreviewTimestamp: "flex items-end",
};
export default noteStyle;
