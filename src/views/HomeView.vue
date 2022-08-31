<template>
  <main>
    <section>
      <h1>{{ $t("welcome") }}</h1>
      <p>{{ $t("about") }}</p>
      <p>{{ $t("about2") }}</p>
    </section>
    <section>
      <h2>{{ $t("advantages") }}</h2>
      <ul>
        <li>
          <i class="fa-solid fa-forward-fast"></i>
          <p>{{ $t("advantage1") }}</p>
        </li>
        <li>
          <i class="fa-solid fa-users"></i>
          <p>{{ $t("advantage2") }}</p>
        </li>
        <li>
          <i class="fa-solid fa-circle-question"></i>
          <p>{{ $t("advantage3") }}</p>
        </li>
      </ul>
    </section>
    <section>
      <p>
        {{ $t("footer_text") }}
        <base-button link to="#" class="secondary">{{
          $t("contact_us")
        }}</base-button>
      </p>
    </section>
  </main>
</template>

<style lang="scss" scoped>
@import "../assets/css/home.scss";
</style>
