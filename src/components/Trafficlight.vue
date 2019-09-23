<template>
    <div id="traffic-light">
        <div class="light red" :class="{active: current=='red'}"></div>
        <div class="light yellow" :class="{active: current=='yellow'}"></div>
        <div class="light green" :class="{active: current=='green'}"></div>
        <div class="duration">{{ duration }}</div>
    </div>
</template>

<script>
    // РЕШЕНИЕ С ТАЙМЕРОМ И ИСПОЛЬЗОВАНИЕМ МЕТОДА GET
    export default {
        name: "Trafficlight",
        props: {
            current: {
                default: 'red'
            },
            dur: {
                type: Number
            }
        },
        data() {
            return {
                duration: null,
            }
        },
        watch: {
            current(newVal) {
                this.startTimer()
            }
        },
        methods: {
            startTimer() {
                this.duration = this.dur
                const incDur = () => {
                    this.duration--
                    if (this.duration > 0) {
                        setTimeout(incDur, 1000)
                    } else {
                        this.$router.push({name: getNext(), query: {prev: this.current}})
                    }
                }

                setTimeout(incDur, 1000)

                const getNext = () => {
                    if (['red', 'green'].indexOf(this.current) !== -1) {
                        return 'yellow'
                    } else {
                        return this.$route.query['prev'] === 'red' ? 'green' : 'red'
                    }
                }
            }
        },
        mounted() {
            this.startTimer()
        },
    }
</script>

<!--
<script>
    // РЕШЕНИЕ БЕЗ ТАЙМЕРА
    export default {
        name: "Trafficlight",
        props: {
            current: {
                default: 'red'
            },
            dur: {
                type: Number
            }
        },
        data () {
            return {
                duration: null,
            }
        },
        mounted() {
            let constroller = new Constroller();

            let red = new State('red', 10);
            let yellowR = new State('yellow', 4);
            let yellowG = new State('yellow', 4);
            let green = new State('green', 15);

            red.next = yellowR;
            yellowR.next = green;
            green.next = yellowG;
            yellowG.next = red;

            constroller.trigger(red, (state)=> {
                this.$router.push(state.name);
            });
        },
    }

    class State {
        constructor(name, dur, next){
            this.name = name;
            this.dur = dur;
            this.next = next;
        }
    }

    class Constroller {
        trigger(state, callback) {
            callback(state);
            setTimeout(()=> {
                this.trigger(state.next, callback);
            }, state.dur * 1000);
        }
    }
</script>
!-->
<style scoped>

</style>