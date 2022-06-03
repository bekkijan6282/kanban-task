<template>
  <div>
    <b-row>
      <b-col v-for="(status, index) in statuses" :key="index" cols="3">
        <b-card :bg-variant="status.color">
          <h6 class="text-white border-1 border-primary text-center">{{status.name}}</h6>
        </b-card>
        <draggable v-model="getFilteredKanban[status.id]" group="test" @change="getKanbanUpdate($event, status.id)" style="min-height: 50px">
          <div v-for="element in getFilteredKanban[status.id]" :key="element.id" class="mt-2">
            <b-card>
              <div class="d-flex justify-content-between">
                <h6>{{element.title}}</h6>
                <div>
                  <b-icon icon="trash" class="text-danger me-3 cursor-pointer" @click="handleDelete(element)"></b-icon>
                  <b-icon icon="pencil" class="text-warning cursor-pointer" @click="handleEdit(element)"></b-icon>
                </div>
              </div>
              <p>{{element.description}}</p>
              <div class="d-flex justify-content-between mt-4">
                <span><b-icon icon="person-fill"></b-icon> {{element.author}}</span>
                <span><b-icon icon="calendar"></b-icon> {{element.created_at}}</span>
              </div>
            </b-card>
          </div>
        </draggable>
        <div class="mt-2 border border-gray p-2" @click="addNewKanban(status.id)">
          <h6 class="text-center">+ Add</h6>
        </div>
      </b-col>
    </b-row>
    <b-modal v-model="addKanbanActive" hide-footer hide-header>
      <AddKanbanModal :status_id = addStatus_id @close="close" :id="id"></AddKanbanModal>
    </b-modal>
    <b-modal v-model="deleteKanbanActive" hide-footer hide-header>
      <DeleteKanbanModal :element="tempDeleteElement" @close="closeDeleteModal" />
    </b-modal>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import {mapActions, mapGetters} from 'vuex';
import AddKanbanModal from '../components/AddKanbanModal';
import DeleteKanbanModal from "@/views/kanban/components/DeleteKanbanModal";

export default {
  name: "KanbanDraggable",
  components: {
    DeleteKanbanModal,
    draggable,
    AddKanbanModal,
  },
  data() {
    return {
      drag: false,
      updateData: {
        from_status_id: null,
        to_status_id: null,
        element: null,
      },
      addKanbanActive: false,
      addStatus_id: null,
      deleteKanbanActive: false,
      tempDeleteElement: null,
      id: null,
    }
  },
  created() {
    this.fetchKanbanStatuses();
    this.fetchKanbanData();
  },
  computed: {
    ...mapGetters('kanban', {
      statuses: 'kanban_statuses',
      kanbanData: 'kanban_data',
    }),
    getFilteredKanban: {
      get() {
        return this.kanbanData;
      },
      set(val) {
        console.log(val)
      }
    }
  },
  methods: {
    ...mapActions('kanban', [
        'fetchKanbanStatuses',
        'fetchKanbanData',
        'updateKanbanData'
    ]),
    getKanbanUpdate(event, id) {
      if(event.added) {
        this.updateData.to_status_id = id;
        this.updateData.element = event.added.element;
      } else if(event.removed) {
        this.updateData.from_status_id = id;
      }

      if (this.updateData.from_status_id && this.updateData.to_status_id) {
        this.updateData.element.status_id = this.updateData.to_status_id;
        this.updateKanbanData(this.updateData.element);
      }
    },
    addNewKanban(status_id) {
      this.id = null;
      this.addStatus_id = status_id;
      this.addKanbanActive = true;
    },
    close() {
      this.addKanbanActive = false;
    },
    handleDelete(element) {
      this.tempDeleteElement = element;
      this.deleteKanbanActive = true;
    },
    closeDeleteModal() {
      this.deleteKanbanActive = false;
    },
    handleEdit(element) {
      this.id = element.id;
      this.addKanbanActive = true;
    }
  }
}
</script>

<style scoped>

</style>