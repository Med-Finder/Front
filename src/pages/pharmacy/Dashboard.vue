<template lang="pug">
  v-container
    v-row(justify="center")
      v-col(cols="8")
        v-data-table(
          :headers="headers"
          :items="items"
          :items-per-page="5"
          class="elevation-1")
          template(v-slot:top)
            v-toolbar(flat color="white")
              v-toolbar-title Medicines
              v-spacer
              v-dialog(v-model="dialog" max-width="500px")
                template(v-slot:activator="{on}")
                  v-btn(color="primary" @click="openDialog") Create
                v-card
                  v-card-title
                    span.headline {{formTitle}}
                  v-card-text
                    v-text-field(
                      full-width
                      v-model="formItem.name"
                      placeholder="Medicine name here...")
                  v-card-actions
                    v-spacer
                    v-btn(color="blue darken-1" text @click="cancel") Cancel
                    v-btn(color="blue darken-1" dark @click="save") Save
          template(v-slot:item.action="{item}")
            v-icon(
              small
              class="mr-2"
              @click="editItem(item)") fa fa-pencil
            v-icon(
              color="error darken-2"
              small
              @click="deleteItem(item)") fa fa-trash
</template>

<script>
export default {
  data: function() {
    return {
      headers: [
        { text: 'Name', align: 'left', value: 'name', },
        { text: '', value: 'action', align: 'right', sortable: false },
      ],
      items: [
        {name: 'med 1'},
        {name: 'med 2'},
        {name: 'med 3'},
      ],
      selectedIndex: -1,
      formItem     : {name: ''},
      dialog       : false
    }
  },
  computed: {
    formTitle () {
      return (this.selectedIndex == -1) ? 'New Medicine' : 'Edit Medicine';
    },
  },
  watch: {
    dialog(val) {
      // if no item selected. create new one
      if(val === true && !this.formItem) {
        this.resetItem();
      }
    }
  },
  methods: {
    resetItem() {
      // use $set to make new object reactive
      this.$set(this, "formItem", {name: ''});
    },
    editItem(item) {
      this.selectedIndex = this.items.indexOf(item);
      let new_copy = Object.assign({}, item);
      this.$set(this, "formItem", new_copy); // make new copy
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.items.indexOf(item);
      confirm('Are you sure ?') && this.items.splice(index, 1)
    },
    openDialog() {
      this.resetItem();
      this.dialog = true;
    },
    cancel() {
      this.dialog = false;
      this.selectedIndex = -1;
      this.resetItem();
    },
    save() {
      let new_item = Object.assign({}, this.formItem);
      //TODO: save item is store...
      if(this.selectedIndex == -1) {
        this.items.push(new_item);
      }else {
        this.$set(this.items, this.selectedIndex, new_item);
        // Object.assign(this.items[index], new_item);
        this.selectedIndex = -1;
        this.resetItem();
      }
      this.dialog = false;
    },
  }

}
</script>