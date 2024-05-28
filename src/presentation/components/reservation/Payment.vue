<template>
    <div>
        <form id="payment-form">
        <div id="payment-element">
            <!--Stripe.js injects the Payment Element-->
        </div>
        <button id="submit">
            <div class="spinner hidden" id="spinner"></div>
            <span id="button-text">Pay now</span>
        </button>
        <div id="payment-message" class="hidden"></div>
        </form>
    </div>
</template>

<script>
    import Stripe from 'stripe';
    export default {
        name: "Payment",
        setup(){
            // This is your test publishable API key.
            const stripe = Stripe("pk_test_51LcuX9DR71U20mVtq1vYgGmciDk52MGfzDTXQrz6AbEBGw69ieBeqRGkqh3B7KbCpR3y4tg1WSYwzOy0opFgFl1w0029m0MWdr");

        }
    }
    
</script>

<style scoped>

</style>