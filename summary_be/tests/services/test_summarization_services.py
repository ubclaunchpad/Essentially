import unittest
from services.summarization import get_summary_service
from app import app

TEXT = "If the buses, trains, and ferries seem more crowded these days, the numbers back up that anecdotal observation. Metro Vancouver’s public transit ridership is still experiencing an exceptionally strong rate of recovery, according to the newest figure from TransLink. Kevin Quinn, the CEO of TransLink, told the business communityon Wednesday during his annual address to the Greater Vancouver Board of Trade that overall ridership has now exceeded over 80% of pre-pandemic levels. This is the highest recovery for any North American system. At over 80%, this is also roughly equivalent to ridership volumes last experienced in 2015 and 2016. This aligns with the ridership forecast established in January 2022, which predicted ridership would recover to between 80% and 90% by the end of this year. At the peak of the pandemic, in April 2020, ridership was just 17% of normal levels. Quinn also added TransLink is on track to     be the first public transit system in North America to reach 100% of pre-pandemic ridership volumes, although it remains to be seen exactly when that will happen. The ongoing widespread practice of semi-remote work for office-based jobs has put a dent in ridership volumes for areas like downtown Vancouver. In contrast, Metro Vancouver’s public transit ridership recovery is higher than New York City’s 65%. TransLink’s ridership is also 60% higher than the combined public transit systems of Seattle and Portland. In terms of fare revenue, TransLink’s farebox recovery rate — the rate at which passenger fare revenues cover the operating costs of the service — is currently hovering at 39%, below the pre-pandemic rate of 59%. Quinn reiterated the need for the federal and provincial governments to create new alternate long-term sources of revenue for public transit authorities that do not rely on demand-driven revenue sources, such as fares and fuel taxes. Over the coming years, fuel taxes that support TransLink costs are expected to dwindle from the accelerating transition into battery-electric vehicles. Currently, 185 cents per litre in fuel taxes within Metro Vancouver go to TransLink, which typically generates over $30 million in monthly revenue from this source. In April 2022, the federal and provincial governments announced $176 million in additional pandemic-time operating subsidy funding for TransLink to avoid major cuts to service levels. This top-up in the subsidy is intended to help cover operating revenue shortfalls in the 2022 and 2023 budgets. Earlier in the pandemic, both governments jointly provided $644 million to TransLink as an emergency operating subsidy amidst the collapse in ridership. This brings total pandemic-time operating subsidies to TransLink to $820 million to date. In exchange for receiving the initial operating subsidies from the governments, TransLink, BC Transit, and BC Ferries are required to limit their annual fare increases until 2024."


class SummarizationServicesTesting(unittest.TestCase):
    def test_success_response(self):
        with app.app_context():
            response = get_summary_service(TEXT)
            EXP_LENGTH = 76
            self.assertEqual(EXP_LENGTH, response.json["Meta"]["length"])

    def test_success_response_diff_length(self):
        with app.app_context():
            response = get_summary_service(TEXT, 7)
            EXP_LENGTH = 191
            self.assertEqual(EXP_LENGTH, response.json["Meta"]["length"])

    def test_empty_text(self):
        with app.app_context():
            response = get_summary_service("")
            EXP_MSG = "Empty Text"
            self.assertEqual(EXP_MSG, response.json["message"])

    def test_bad_input_type(self):
        with app.app_context():
            response = get_summary_service(150)
            EXP_MSG = "Bad Input Type"
            self.assertEqual(EXP_MSG, response.json["message"])
