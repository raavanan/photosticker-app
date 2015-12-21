## Synopsis

The PhotoSticker App ready as per your requirement, I have tried my best to Include all the features you've requested. bellow is the list you sent me
along with the tasks i've completed.

#Structure
● The application has two columns: The photo area on the left, a sidebar containing the
sticker library on the right. **Completed**
● The sticker library is 150px wide, the photo area fills the remaining width.
Photo area **Complete** i have maintained a 70 30 divide for the two columns hope you dont mind.
● Initially, the photo area displays a file input field for uploading a new photo. **Complete**
● Display the photo after a valid image has been picked in the input field. **Complete**
● Show a "Start over" button in the top left corner when a photo is uploaded. **Complete**
● When the "Start over" button is clicked, remove the photo and stickers and allow
uploading a new photo. **Complete**


#Sticker library sidebar
● The library displays an "Upload new sticker" button on top.**Complete**
● When the "Upload new sticker" button is clicked, display a form in a modal window.**Complete**
● The form in the modal window has a file input field, a title text field and a submit button.**Complete**
  ○ All fields are required. Disable the submit button while any field is empty.**Complete**
  ○ When the form is submitted, close the modal and add the sticker to the library.**Complete**
● The stickers are displayed below the "Upload new sticker" button.**Complete**
● A sticker in the library displays the image and title.**Complete**
● Resize sticker images in the library area to fit within 150 x 150px.**Complete**
● Allow dragging stickers from the sidebar and dropping them onto the photo.**Complete**
● When a sticker is dropped onto the photo, it stays in position.**Complete**
● The same sticker can be added multiple times.**Complete**


#Bonus features
These are optional. Pick one or more in case you still have energy left!
● When a user leaves the application and returns later, display the state of how the user
left the application.**Complete**
○ Use localStoragefor data persistence.**Complete**
○ Display a warning to the user and stop storing the data in localStoragewhile
the total data size exceeds 5MB.**Complete**
● Inform the user of input errors in the "Upload new sticker" form by displaying a
user­friendly message below the input field.**Complete**
● Allow resizing and repositioning stickers after they were dropped.**Complete**
● When you hover a sticker in the sidebar or on the photo, display a delete button in the
top right corner that deletes the sticker.**Complete**


## Installation

 1) Unzip.
 2) Run a simpleHttp Server and you are good to go.

## libraries used

  1) angularJs
  2) Bootstrap
  3) angular-UI-router
  4) jquery
  5) snap.svg, snap.svg freeTransform
  6) canvas-toBlob, filsaver.js

## Known Issue

  1) the retrieved data from localstorage displays perfectly but the Editing capability of the objects are lost.
      hence the stickers and images cannot be moved.
