<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <nuxt-link
        class="navbar-item subtitle is-4"
        to="/"
      >
        Youtube Player
      </nuxt-link>
    </div> <!-- end of navbar-brand -->

    <div class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item">
          <div class="field has-addons">
            <div class="control">
              <input name="q" class="input" type="text" placeholder="検索">
            </div> <!-- end of control -->
            <div class="control">
              <button class="button">
                Search
              </button>
            </div> <!-- end of control -->
          </div> <!-- end of field has-addons -->
        </div> <!-- end of navbar-item -->
      </div> <!-- end of navbar-start -->
    </div> <!-- end of navbar-menu -->
  </nav>
</template>
