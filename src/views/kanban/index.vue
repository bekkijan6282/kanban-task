<template>
  <section>
    <KanbanDraggable></KanbanDraggable>
  </section>
</template>

<script>
import KanbanDraggable from "@/views/kanban/components/KanbanDraggable";
export default {
  name: "KanbanIndex",
  components: {
    KanbanDraggable,
  }
}
</script>

<style scoped>

</style>