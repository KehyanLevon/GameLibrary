<template>
  <div class="header-area header-sticky container">
    <div class="row">
      <div class="col-12">
        <nav class="main-nav">
          <NuxtLink to="/" class="logo">
            <img src="@/assets/images/logo.png" alt="Logo" />
          </NuxtLink>

          <div class="search-input">
            <form id="search" action="#">
              <input
                type="text"
                placeholder="Type Something"
                id="searchText"
                name="searchKeyword"
              />
              <i class="fa fa-search"></i>
            </form>
          </div>

          <ul class="nav">
            <li>
              <NuxtLink to="/">Home</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/AboutUs">About</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/Profile">Profile</NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
