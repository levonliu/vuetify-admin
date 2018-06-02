<template>
    <v-container row wrap>
        <v-layout row wrap>
            <v-flex xs6>
                <v-text-field
                        v-model="name"
                        label="姓名"
                        :rules="nameRules"
                        :counter="10"
                        required
                        prepend-icon="account_circle"
                ></v-text-field>

                <v-text-field
                        label="电话"
                        required
                        prepend-icon="phone"
                ></v-text-field>
                <v-select
                        label="住址"
                        v-model="select"
                        :items="items"
                        :rules="[v => !!v || 'Item is required']"
                        required
                        prepend-icon="location_on"
                ></v-select>
                <v-flex xs4>
                    <v-radio-group v-model="radios" :mandatory="false" row prepend-icon="wc">
                        <v-radio label="男" value="1"></v-radio>
                        <v-radio label="女" value="2"></v-radio>
                    </v-radio-group>
                </v-flex>
                <v-flex xs4>
                    <v-radio-group v-model="group_radios" :mandatory="false" row prepend-icon="group">
                        <v-radio label="A" value="1"></v-radio>
                        <v-radio label="B" value="2"></v-radio>
                    </v-radio-group>
                </v-flex>
                <v-btn color="cyan darken-2" dark>
                    <v-icon dark left>arrow_back</v-icon>Back
                </v-btn>
                <v-btn :disabled="!valid" @click="submit" color="primary" dark>
                    submit
                    <v-icon dark right>send</v-icon>
                </v-btn>
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
            radios: "1",
            group_radios:'1'
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