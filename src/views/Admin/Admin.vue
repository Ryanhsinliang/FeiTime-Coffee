<script setup>
  import AdminSidebar from '@/components/AdminSidebar.vue';
</script>
<template>
  <section class="flex h-screen">
    <aside>
      <AdminSidebar />
    </aside>

    <main>
      <router-view />
    </main>
  </section>
</template>
