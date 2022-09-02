<template>
  <section id="section">
    <div id="container">
    </div>
  </section>
</template>

<script>
  import ROUTES from '~/routes/api'

export default {
  async fetch({store}) {
    const payload = {
      uri: ROUTS.GET.POPULARS
    }

    await store.disptch('fetchPopularVideos', payload)
}
</script>
