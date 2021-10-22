<template>
  <section class="app">
    <form v-on:submit.prevent="addPersonHandler" class="app">
      <h2>Shit List</h2>
      <div class="actions">
        <input placeholder="Name" type="text" v-model="personInput" />
        <button type="submit">Add Person</button>
      </div>
      <br />
      <hr />
      <section class="table" v-if="people.length > 0">
        <table v-for="person in people" :key="person.id">
          <tr class="list-item">
            <td class="name">
              <p>
                {{ person.name }}
              </p>
            </td>
            <td class="name-action">
              <button
                class="trash"
                v-on:click.prevent="removePersonHandler(person.id)"
              >
                ❌
              </button>
            </td>
          </tr>
        </table>
      </section>
      <section class="nobody" v-else>Nobody is on your shitlist</section>
    </form>
  </section>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        people: [],
        personInput: '',
      };
    },
    mounted() {
      try {
        const cachedPeople = window.localStorage.getItem('peopleList');
        JSON.parse(cachedPeople).forEach((person) => this.people.push(person));
      } catch (err) {}
    },
    methods: {
      removePersonHandler(id) {
        if (this.people.length === 1) {
          this.people = [];
        } else if (this.people.length > 1) {
          this.people.forEach((person, i) => {
            if (person.id === id) {
              this.people.splice(i, 1);
            }
          });
        }

        window.localStorage.setItem('peopleList', JSON.stringify(this.people));
      },
      addPersonHandler(e) {
        if (this.personInput?.length > 0) {
          this.people.push({
            id: this.people.length - 1 > -1 ? this.people.length : 0,
            name: this.personInput,
          });
          this.personInput = '';
          window.localStorage.setItem(
            'peopleList',
            JSON.stringify(this.people)
          );
        }
      },
    },
  };
</script>

<style scoped>
  ul {
    list-style: none;
    text-align: left;
  }
  li {
    font-weight: 500;
  }
  form {
    width: 50%;
  }
  input {
    margin-top: auto;
    margin-bottom: auto;
  }
  button {
    margin: 0;
    padding-right: 5px;
    padding-left: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .app {
    text-align: center;
    flex-wrap: nowrap;
    margin: auto;
  }
  .actions {
    display: flex;
    justify-content: center;
  }
  .name {
    display: flex;
    margin: auto;
    height: 100%;
  }
  .name-action {
    padding: 0;
    margin: 0;
    /* justify-content: center;
    align-content: center; */
  }
  .list-item {
    justify-content: baseline;
    border-bottom: 1px white solid;
  }
  .trash {
    display: flex;
    margin: auto;
    margin-right: 0;
    background-color: transparent;
  }
  .nobody {
    margin-top: 20px;
  }
</style>
