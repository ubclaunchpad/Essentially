<script lang="ts">
	import Dashboard from '$lib/components/layouts/dashboard.svelte';
	import SummaryCard from './summaryCard.svelte';

	let summary = [
		{
			title: 'How environmental factors affect the growth rate of a specific plant species',
			date: '',
			tags: ['EnvironmentalFactors', 'PlantGrowth', 'SpeciesSpecificity', 'BiologyResearch'],
			type: 'scientific',
			description:
				"investigate how environmental factors such as light, temperature, and soil composition affect the growth rate of a specific plant species. To accomplish this, I will conduct a series of experiments using controlled environments and varying conditions. Through rigorous data analysis and hypothesis testing, I hope to gain insights into the plant's growth patterns and the factors that influence them, contributing to our understanding of ecology and plant biology."
		},

		{
			title: 'Designing a more sustainable transportation system',
			date: '',
			tags: ['Sustainability', 'Transportation', 'UrbanPlanning', 'Environment', 'Engineering'],
			type: 'technical',
			description:
				'propose a new transportation system that is both more environmentally friendly and efficient. By considering factors such as public transit, electric vehicles, and urban planning, I hope to design a comprehensive system that reduces carbon emissions and promotes sustainable travel options.'
		},
		{
			title: 'The effects of climate change on global agriculture',
			date: '',
			tags: ['ClimateChange', 'Agriculture', 'FoodSecurity', 'Environment', 'Research'],
			type: 'academic',
			description:
				'analyze the impact of climate change on global food production and security. By reviewing existing research and conducting case studies, I hope to identify potential vulnerabilities in agriculture and suggest strategies for mitigating the effects of climate change on food systems.'
		},
		{
			title: 'Developing a new approach to cancer treatment',
			date: '',
			tags: ['CancerResearch', 'MedicalScience', 'Healthcare', 'Pharmacology', 'Research'],
			type: 'technical',
			description:
				'explore the potential of a novel cancer treatment approach that targets specific genes and proteins. By conducting preclinical studies and evaluating the effectiveness and safety of the treatment, I hope to contribute to the development of new and more effective cancer therapies.'
		},
		{
			title: 'Developing a new approach to cancer treatment',
			date: '',
			tags: ['CancerResearch', 'MedicalScience', 'Healthcare', 'Pharmacology', 'Research'],
			type: 'technical',
			description:
				'explore the potential of a novel cancer treatment approach that targets specific genes and proteins. By conducting preclinical studies and evaluating the effectiveness and safety of the treatment, I hope to contribute to the development of new and more effective cancer therapies.'
		},
		{
			title: 'The effects of music on cognitive performance',
			date: '',
			tags: ['Music', 'Cognition', 'Psychology', 'Research', 'Education'],
			type: 'academic',
			description:
				'explore the relationship between music and cognitive performance by conducting experiments with different types of music and cognitive tasks. By analyzing the data, I hope to identify potential benefits of music for learning and memory and suggest strategies for incorporating music into educational settings.'
		}
	];
</script>

<svelte:head>
	<title>Notes</title>
	<meta name="past summarized articles" content="history" />
</svelte:head>

<Dashboard title="Files">
	<div class="page">
		<div class="topbar">
			<input type="text" placeholder="Search Everywhere" />
		</div>

		<div class="summaries">
			{#each summary as p}
				<SummaryCard {...p} />
			{/each}
		</div>
	</div>
</Dashboard>

<style>
	.page {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		row-gap: 20px;
	}

	.summaries {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		display: grid;
		gap: 1rem;
		overflow-y: scroll;
		height: 100%;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	}

	.topbar {
		max-width: 100%;
		width: 1200px;

		display: flex;
		justify-content: center;
		flex: 1;
	}

	.topbar input {
		height: 40px;
	}
</style>
