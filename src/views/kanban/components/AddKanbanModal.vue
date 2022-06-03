<template>
  <div>
    <h4>Add Form</h4>
    <hr>
    <b-form>
      <ValidationObserver ref="observer">
        <b-form-group label="Title">
          <ValidationProvider rules="required" v-slot="{ errors }" name="title">
            <b-form-input v-model="newKanban.title"></b-form-input>
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </b-form-group>
        <b-form-group label="Author" class="mt-2">
          <ValidationProvider rules="required" v-slot="{ errors }" name="author">
            <b-form-input v-model="newKanban.author"></b-form-input>
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </b-form-group>
        <b-form-group label="Description" class="mt-2">
          <ValidationProvider rules="required" v-slot="{ errors }" name="description">
            <b-form-input v-model="newKanban.description"></b-form-input>
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </b-form-group>
      </ValidationObserver>
      <div class="w-full d-flex mt-5 justify-content-between">
        <b-button variant="secondary" @click="$emit('close')">Cancel</b-button>
        <b-button variant="success" type="button" @click="submitForm">Submit</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import moment from 'moment';
import {ValidationObserver, ValidationProvider, extend} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { messages } from 'vee-validate/dist/locale/en.json';
import {fetchKanban} from "@/request/api/kanban";

Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule],
    message: messages[rule]
  });
});

export default {
  name: "AddKanbanModal",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  props: {
    status_id: {
      required: true,
      default: null,
    },
    id: {
      required: true,
    }
  },
  data() {
    return {
      newKanban: {
        status_id: null,
        title: '',
        description: '',
        author: '',
        created_at: '',
        updated_at: ''
      }
    }
  },
  methods: {
    ...mapActions('kanban', [
        'createNewKanban',
        'updateKanbanData',
    ]),
    async submitForm() {
      const isValid = await this.$refs.observer.validate();
      if(isValid) {
        if(!this.id) {
          this.newKanban.status_id = this.status_id;
          this.newKanban.created_at = moment().format('YYYY-MM-DD');
          this.newKanban.updated_at = moment().format('YYYY-MM-DD');
          await this.createNewKanban(this.newKanban);
        } else {
          await this.updateKanbanData(this.newKanban);
        }
        this.$emit('close');
      }
    },
    getKanban() {
      fetchKanban(this.id).then(res => {
        this.newKanban = res.data;
      });
    }

  },
  watch: {
    id: {
      immediate: true,
      handler(val) {
        if(val) {
          this.getKanban();
        }
      }
    },
  }
}
</script>

<style scoped>

</style>