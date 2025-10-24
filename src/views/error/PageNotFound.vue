<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
    <h1 class="text-7xl font-extrabold bg-[var(--main-color)]">404</h1>
    <p class="mt-4 text-xl font-semibold bg-[var(--main-color)]">Oops! That page can’t be found</p>
    <p class="mt-2 bg-[var(--main-color)]">The page you are looking for it maybe deleted</p>

    <router-link
      to="/"
      class="mt-6 inline-block px-6 py-2 border border-[var(--main-color)] text-[var(--main-color)] font-medium rounded-md hover:bg-blue-500 hover:text-white transition-colors"
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
