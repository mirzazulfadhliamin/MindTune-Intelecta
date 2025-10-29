<template>
  <div
    class="bg-[var(--bg-white)] rounded-2xl shadow-lg p-8 max-w-3xl mx-auto transition-all duration-300 hover:shadow-2xl mt-4"
  >
    <div class="space-y-8">
      <div class="text-center space-y-2 mb-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-[var(--main-color)]">
          Your Personalized Healing Playlist
        </h1>
        <p class="text-[var(--t-gray)]">
          Based on your mental wellness assessment, we've curated these tracks for you.
        </p>
      </div>
      <div class="flex flex-col sm:flex-row gap-4">
        <div
          class="flex-1 rounded-2xl border border-[var(--bg-green)] bg-[var(--bg-green)]/40 p-6 text-center shadow-sm"
        >
          <div class="flex flex-col items-center space-y-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-[var(--dark-green)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M22 7L14.1314 14.8686C13.7354 15.2646 13.5373 15.4627 13.309 15.5368C13.1082 15.6021 12.8918 15.6021 12.691 15.5368C12.4627 15.4627 12.2646 15.2646 11.8686 14.8686L9.13137 12.1314C8.73535 11.7354 8.53735 11.5373 8.30902 11.4632C8.10817 11.3979 7.89183 11.3979 7.69098 11.4632C7.46265 11.5373 7.26465 11.7354 6.86863 12.1314L2 17M22 7H15M22 7V14"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <p class="text-sm text-[var(--t-gray)]">Depression Level</p>
            <p class="text-2xl font-semibold text-[var(--dark-green)]">3/27</p>
            <p class="text-sm text-[var(--dark-green)]">Minimal</p>
          </div>
        </div>
        <div
          class="flex-1 rounded-2xl border border-[var(--main-color)]/20 bg-[var(--main-color)]/10 p-6 text-center shadow-sm"
        >
          <div class="flex flex-col items-center space-y-2">
            <span class="text-2xl">😌</span>
            <p class="text-sm text-[var(--t-gray)]">Current Mood</p>
            <p class="text-lg font-semibold text-[var(--main-color)]">Moderate</p>
          </div>
        </div>
      </div>
      <div
        class=" bg-[var(--main-color)] rounded-xl p-6 text-[var(--t-white)] shadow-lg"
      >
        <div class="flex items-center space-x-3 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-[var(--t-white)]/80"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
          <h3 class="text-xl font-bold">Your Healing Playlist is Ready!</h3>
        </div>

        <p class="opacity-80 mb-4">Healing Journey — 10/25/2025</p>

        <div class="grid grid-cols-3 gap-4 mb-6 text-sm">
          <div>
            <p class="opacity-70">Duration</p>
            <p class="font-semibold">15 minutes</p>
          </div>
          <div>
            <p class="opacity-70">Genre</p>
            <p class="font-semibold">Lo-fi Chill, Acoustic</p>
          </div>
          <div>
            <p class="opacity-70">Mood Score</p>
            <p class="font-semibold">5/10</p>
          </div>
        </div>

        <button
          class="w-full py-3 bg-[var(--t-white)] text-[var(--main-color)] rounded-lg font-semibold hover:bg-[var(--bg-white)] transition-all flex items-center justify-center space-x-2 shadow-sm"
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
          </svg>
          <span>Open in Spotify</span>
        </button>
      </div>
      <button
        class="w-full py-3 border border-[var(--silver)] text-[var(--t-gray)] rounded-lg font-medium hover:bg-[var(--bg)] active:scale-[0.98] transition-all"
      >
        Create Another Playlist
      </button>
    </div>
  </div>
</template>
