<template>
  <div class="bg-[var(--bg-white)] rounded-2xl shadow-lg p-8 max-w-3xl mx-auto transition-all duration-300 hover:shadow-2xl ">
    <div class="space-y-8">
      <div class="align-middle">
        <h1 class="text-[var(--main-color)] text-3xl font-bold">Your Personalized Healing Playlist</h1>
      </div>
      <!-- Section: Assessment -->
      <div class="rounded-xl p-6 bg-orange-50 border border-orange-200 flex items-start space-x-4">
        <div class="flex-shrink-0 text-orange-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-7 h-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
            />
          </svg>
        </div>
        <div>
          <h3 class="font-semibold text-gray-800 text-lg mb-2">
            Your Mental Health Assessment
          </h3>
          <p class="text-gray-700 mb-2 leading-relaxed">
            You seem to be going through a challenging time. Remember, you're not alone.
          </p>
          <p class="text-sm text-gray-600">
            Gentle, soothing music can help. Consider reaching out to someone you trust.
          </p>
        </div>
      </div>

      <!-- Section: Playlist -->
      <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
        <div class="flex items-center space-x-3 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-blue-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
          </svg>
          <h3 class="text-xl font-bold">Your Healing Playlist is Ready!</h3>
        </div>

        <p class="text-blue-100 mb-4">Healing Journey — 10/25/2025</p>

        <div class="grid grid-cols-3 gap-4 mb-6 text-sm">
          <div>
            <p class="text-blue-200">Duration</p>
            <p class="font-semibold">15 minutes</p>
          </div>
          <div>
            <p class="text-blue-200">Genre</p>
            <p class="font-semibold">Lo-fi Chill, Acoustic</p>
          </div>
          <div>
            <p class="text-blue-200">Mood Score</p>
            <p class="font-semibold">5/10</p>
          </div>
        </div>

        <button
          class="w-full py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all flex items-center justify-center space-x-2 shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"
            ></path>
            <path d="M5 3v4"></path>
            <path d="M19 17v4"></path>
            <path d="M3 5h4"></path>
            <path d="M17 19h4"></path>
          </svg>
          <span>Open in Spotify</span>
        </button>
      </div>

      <!-- Button: Create Another -->
      <button
        class="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 active:scale-[0.98] transition-all"
      >
        Create Another Playlist
      </button>

    </div>
  </div>
</template>
