<template>
	<div>
	<v-sidebar />
	<div class="content-box">
		<div class="content">
			<router-view v-slot="{ Component }">
				<transition name="move" mode="out-in">
						<component :is="Component"></component>
				</transition>
			</router-view>
		</div>
	</div>
</div>
</template>
<script setup lang="ts">
import vSidebar from '../components/sidebar.vue';
</script>
