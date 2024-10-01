<template>
  <div>
    <BookList />
    <h1>Add Book</h1>
    <form @submit.prevent="addBook">
      <div>
        <label for="isbn">ISBN:</label> <input type="text" v-model="isbn" id="isbn" required />
      </div>
      <div>
        <label for="name">Name:</label> <input type="text" v-model="name" id="name" required />
      </div>
      <button type="submit">Add Book</button>
    </form>
    <h1>Update Book</h1>
    <form @submit.prevent="updateBook">
      <div>
        <label for="isbn">ISBN:</label>
        <input type="text" v-model="updateIsbn" id="update-isbn" required />
      </div>
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="updateName" id="update-name" required />
      </div>
      <button type="submit">Update Book</button>
    </form>
    <h1>Delete Book</h1>
    <form @submit.prevent="deleteBook">
      <div>
        <label for="isbn">ISBN:</label>
        <input type="text" v-model="deleteIsbn" id="delete-isbn" required />
      </div>
      <button type="submit">Delete Book</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import db from '../firebase/init.js'
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore'
import BookList from '../components/BookList.vue'

const isbn = ref('')
const name = ref('')
const updateIsbn = ref('')
const updateName = ref('')
const deleteIsbn = ref('')

const addBook = async () => {
  try {
    const isbnNumber = Number(isbn.value)
    if (isNaN(isbnNumber)) {
      alert('ISBN must be a valid number')
      return
    }
    const dulpCheck = query(collection(db, 'books'), where('isbn', '==', isbnNumber))
    const querySnapshot = await getDocs(dulpCheck)

    if (!querySnapshot.empty) {
      alert('ISBN already exists in the database.')
      return
    }
    await addDoc(collection(db, 'books'), { isbn: isbnNumber, name: name.value })
    isbn.value = ''
    name.value = ''
    alert('Book added successfully!')
  } catch (error) {
    console.error('Error adding book: ', error)
  }
}
const updateBook = async () => {
  try {
    const isbnNumber = Number(updateIsbn.value)
    if (isNaN(isbnNumber)) {
      alert('ISBN must be a valid number')
      return
    }

    const bookQuery = query(collection(db, 'books'), where('isbn', '==', isbnNumber))
    const querySnapshot = await getDocs(bookQuery)

    if (querySnapshot.empty) {
      alert('No book found with this ISBN.')
      return
    }

    const bookDoc = doc(db, 'books', querySnapshot.docs[0].id)
    await updateDoc(bookDoc, { name: updateName.value })
    updateIsbn.value = ''
    updateName.value = ''
    alert('Book updated successfully!')
  } catch (error) {
    console.error('Error updating book: ', error)
  }
}
const deleteBook = async () => {
  try {
    const isbnNumber = Number(deleteIsbn.value)
    if (isNaN(isbnNumber)) {
      alert('ISBN must be a valid number')
      return
    }

    const bookQuery = query(collection(db, 'books'), where('isbn', '==', isbnNumber))
    const querySnapshot = await getDocs(bookQuery)

    if (querySnapshot.empty) {
      alert('No book found with this ISBN.')
      return
    }

    const bookDoc = doc(db, 'books', querySnapshot.docs[0].id)
    await deleteDoc(bookDoc)
    deleteIsbn.value = ''
    alert('Book deleted successfully!')
  } catch (error) {
    console.error('Error deleting book: ', error)
  }
}
</script>
