<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
    <h1 class="text-7xl font-extrabold text-blue-600">404</h1>
    <p class="mt-4 text-xl font-semibold text-gray-700">Oops! That page can’t be found</p>
    <p class="mt-2 text-gray-500">The page you are looking for it maybe deleted</p>

    <router-link
      to="/"
      class="mt-6 inline-block px-6 py-2 border border-blue-500 text-blue-500 font-medium rounded-md hover:bg-blue-500 hover:text-white transition-colors"
    >
      Go To Home
    </router-link>
  </div>
</template>

<script>
export default {
  name: "PageNotFound"
}
</script>
