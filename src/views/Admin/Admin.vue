<script setup>
  import AdminSidebar from '@/components/AdminSidebar.vue';
</script>
<template>
  <section class="flex h-screen">
    <aside class="fixed top-0 left-0 bottom-0 w-64">
      <AdminSidebar />
    </aside>

    <main class="w-full overflow-y-auto ml-64">
      <router-view />
    </main>
  </section>
</template>
