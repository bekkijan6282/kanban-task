<template>
  <div v-if="element">
    <div class="d-flex justify-content-between">
      <h6>{{element.title}}</h6>
      <div>
        <b-icon icon="trash" class="text-danger me-3 cursor-pointer" @click="handleDelete(element)"></b-icon>
        <b-icon icon="pencil" class="text-warning cursor-pointer"></b-icon>
      </div>
    </div>
    <p>{{element.description}}</p>
    <div class="d-flex justify-content-between mt-4">
      <span><b-icon icon="person-fill"></b-icon> {{element.author}}</span>
      <span><b-icon icon="calendar"></b-icon> {{element.created_at}}</span>
    </div>
    <div class="mt-4 d-flex justify-content-between">
      <b-button variant="secondary" @click="$emit('close')">Cancel</b-button>
      <b-button variant="danger" @click="handleDelete" >Delete</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeleteKanbanModal",
  props: {
    element: {
      required: true,
    }
  },
  methods: {
    handleDelete() {
      this.$store.dispatch('kanban/deleteKanban', this.element).then(() => {
        this.$emit('close');
      })
    }
  }
}
</script>

<style scoped>

</style>