<template>
    <v-container row wrap>
        <v-layout row wrap>
            <v-flex xs6>
                <v-text-field
                        v-model="name"
                        :rules="nameRules"
                        :counter="10"
                        required
                        single-line
                        prepend-icon="account_circle"
                ></v-text-field>
                <v-flex xs4>
                <v-radio-group v-model="radios" :mandatory="false" row prepend-icon="wc">
                    <v-radio label="男" value="1"></v-radio>
                    <v-radio label="女" value="2"></v-radio>
                </v-radio-group>
                </v-flex>
                <v-text-field
                        single-line
                        prepend-icon="phone"
                ></v-text-field>
                <v-select
                        v-model="select"
                        :items="items"
                        :rules="[v => !!v || 'Item is required']"
                        required
                        prepend-icon="location_on"
                ></v-select>
                <v-btn :disabled="!valid" @click="submit">
                    submit
                </v-btn>
                <v-btn @click="clear">clear</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "customer_edit",
        data: () => ({
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters'
            ],
            select: 'a',
            items: [
                'a',
                'b',
            ],
            radios: "1"
        }),

        methods: {
            submit () {
                if (this.$refs.form.validate()) {
                    // Native form submission is not yet supported
                    // axios.post('/api/submit', {
                    //     name: this.name,
                    //     email: this.email,
                    //     select: this.select,
                    //     checkbox: this.checkbox
                    // })
                }
            },
            clear () {
                this.$refs.form.reset()
            }
        }
    }
</script>

<style scoped>

</style>