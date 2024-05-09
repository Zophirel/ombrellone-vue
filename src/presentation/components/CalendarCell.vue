    <style scoped>
        div {
            width: 96%;
            background-color: #C0F54F;
            border: 2px solid #D9FF87;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #618020;
            font-size: 30px;
            font-weight: bold;
        }
    </style>

    <template>
        <div>
            {{ getDayNumber }}
        </div>
    </template>

    <script>
        export default { 
            name: "CalendarCell",
            props: {
                busy: Boolean,
                day: Number
            },

            computed : {
                getDayNumber(){
                    return this.day;
                }
            }
        };
    </script>