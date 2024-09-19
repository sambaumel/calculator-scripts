document.addEventListener("DOMContentLoaded", function () {
    function toggleAccordion(elementId, isVisible) {
        const element = document.getElementById(elementId);
        element.style.display = isVisible ? "block" : "none";
        updateTotal();
    }

    function updateTotal() {
        let total = 0;
        let totalPerformerCount = 0;
        let performersPerDay = 0;
        let crewMembers = 6; // Base crew size

        // Retrieve input values with fallback to zero
        const scriptwritingOption = document.getElementById('scriptwritingOption').value;
        const scenes = parseInt(document.getElementById('numberOfScenes').value) || 0;
        const pagesPerScenario = parseInt(document.getElementById('pagesPerScenario').value) || 1;
        const locationsToSecure = parseInt(document.getElementById('numberOfLocationsToSecure').value) || 0;
        const providedLocations = parseInt(document.getElementById('numberOfProvidedLocations').value) || 0;
        const numberOfCompanyMoves = parseInt(document.getElementById('numberOfCompanyMoves').value) || 0;
        const providedPerformers = parseInt(document.getElementById('numberOfProvidedPerformers').value) || 0;
        const leadPerformers = parseInt(document.getElementById('leadPerformers').value) || 0;
        const backgroundPerformers = parseInt(document.getElementById('backgroundPerformers').value) || 0;
        const rehearsalType = document.getElementById('rehearsalType').value;
        const rehearsalPerformers = parseInt(document.getElementById('rehearsalPerformers').value) || 0;
        const wardrobePerformers = parseInt(document.getElementById('wardrobePerformers').value) || 0;

        // Special Services
        const stylizedLighting = document.getElementById('stylizedLighting').checked;
        const specialProps = document.getElementById('specialProps').checked;
        const hairMakeupArtist = document.getElementById('hairMakeupArtist').checked;
        const craftServices = document.getElementById('craftServices').checked;

        // Constants for rates and fees
        const MAX_PAGES_PER_DAY = 22;
        const MAX_SCENARIOS_PER_DAY = 5;
        const MAX_LOCATIONS_PER_DAY = numberOfCompanyMoves === 1 ? 4 : 2;
        const LOCATION_FEE = 2500;
        const LOCATION_SCOUTING_FEE = 600;
        const COMPANY_MOVE_FEE = 200;
        const FULL_SCRIPTWRITING_FEE_PER_SCENARIO = 750;
        const SCRIPT_EDITING_FEE_PER_SCENARIO = 400;
        const LEAD_RATE = 500;
        const BACKGROUND_RATE = 125;
        const IN_PERSON_REHEARSAL_RATE = 200;
        const VIDEO_CHAT_REHEARSAL_RATE = 200;
        const REHEARSAL_SPACE_FEE = 500;
        const GAFFER_KIT_FEE = 1700;
        const PRODUCTION_MANAGER_FEE = 600;
        const PRODUCER_PREPROD_RATE = 1000;
        const PRODUCER_PROD_RATE = 1500;
        const DIRECTOR_PREPROD_RATE = 1500;
        const DIRECTOR_PROD_RATE = 2000;
        const DP_PREPROD_RATE = 1500;
        const DP_PROD_RATE = 2000;
        const SOUND_MIXER_FEE = 800;
        const PA_FEE = 350;
        const PRODUCTION_DESIGNER_FEE = 750;
        const DESIGN_MATERIALS_FEE = 750;
        const WARDROBE_COST_PER_PERFORMER = 150;
        const WARDROBE_DESIGNER_FEE = 750;
        const MAKEUP_ARTIST_FEE = 950;
        const FIRST_AD_FEE = 650;
        const DRIVER_FEE = 350;
        const ADDITIONAL_VEHICLE_FEE = 350;
        const STANDARD_VEHICLE_FEE = 350;
        const FLAT_FEE = 750; // Insurance, Subscriptions, Shipping
        const CRAFT_SERVICES_PER_CREW = 70;
        const CRAFT_SERVICES_PER_PERFORMER = 30;
        const EXPENDABLES_FEE = 500;
        const HARD_DRIVE_FEE = 400;
        const STITCHING_RATE = 300;
        const ASSISTANT_EDITOR_RATE = 500;
        const SENIOR_EDITOR_RATE = 750;
        const VFX_RATE = 500;
        const POST_SOUND_RATE = 600;
        const COLORIST_RATE = 600;
        const SECOND_AD_RATE = 550;
        const PROCESSING_FEE_PER_CREW = 50;
        const GAFFER_FEE = 700;
        const KEY_GRIP_FEE = 650;
        const SCRIPT_SUPERVISOR_FEE = 500;
        const ADDITIONAL_PA_FEE = 350;
        const CASTING_DIRECTOR_RATE = 500;
        const LOCATION_SCOUT_RATE = 500;

        // Calculations for shoot days
        const totalLocations = locationsToSecure + providedLocations;
        const totalPages = pagesPerScenario * scenes;
        const shootDaysForPages = Math.ceil(totalPages / MAX_PAGES_PER_DAY);
        const shootDaysForScenarios = Math.ceil(scenes / MAX_SCENARIOS_PER_DAY);
        const shootDaysForLocations = Math.ceil(totalLocations / MAX_LOCATIONS_PER_DAY);
        const shootDays = Math.max(shootDaysForPages, shootDaysForScenarios, shootDaysForLocations);

        // Pre-Production Days Estimation
        const producerPreProdDays = 3 * shootDays;
        const pmPreProdDays = 2 * shootDays;
        const directorPreProdDays = 1.5 * shootDays;
        const dpPreProdDays = 1 * shootDays;

        const performersToCast = ((leadPerformers + backgroundPerformers) || 0) * shootDays;
        const castingDirectorPreProdDays = Math.ceil(performersToCast / 5);

        const locationScoutPreProdDays = locationsToSecure;

        // Pre-Production Fees
        total += producerPreProdDays * PRODUCER_PREPROD_RATE;
        total += pmPreProdDays * PRODUCTION_MANAGER_FEE;
        total += directorPreProdDays * DIRECTOR_PREPROD_RATE;
        total += dpPreProdDays * DP_PREPROD_RATE;

        // Scriptwriting Services
        if (scriptwritingOption === 'full') {
            total += scenes * FULL_SCRIPTWRITING_FEE_PER_SCENARIO;
        } else if (scriptwritingOption === 'editing') {
            total += scenes * SCRIPT_EDITING_FEE_PER_SCENARIO;
        }

        // Casting Director Fee
        if (performersToCast > 0) {
            total += castingDirectorPreProdDays * CASTING_DIRECTOR_RATE;
        }

        // Location Scout Fee
        if (locationsToSecure > 0) {
            total += locationScoutPreProdDays * LOCATION_SCOUT_RATE;
        }

        // Location Costs
        if (locationsToSecure > 0) {
            total += locationsToSecure * (LOCATION_FEE + LOCATION_SCOUTING_FEE);
        }

        // Company Moves Cost
        if (numberOfCompanyMoves > 0) {
            total += COMPANY_MOVE_FEE * numberOfCompanyMoves * shootDays;
        }

        // Performer Costs
        if (leadPerformers > 0) {
            total += leadPerformers * LEAD_RATE * shootDays;
            totalPerformerCount += leadPerformers * shootDays;
            performersPerDay += leadPerformers;
        }
        if (backgroundPerformers > 0) {
            total += backgroundPerformers * BACKGROUND_RATE * shootDays;
            totalPerformerCount += backgroundPerformers * shootDays;
            performersPerDay += backgroundPerformers;
        }

        // Rehearsal Costs
        if (rehearsalType !== 'none') {
            const nonProvidedRehearsalPerformers = Math.max(0, rehearsalPerformers - providedPerformers);
            if (nonProvidedRehearsalPerformers > 0) {
                if (rehearsalType === 'inPerson') {
                    total += nonProvidedRehearsalPerformers * IN_PERSON_REHEARSAL_RATE;
                    total += REHEARSAL_SPACE_FEE;
                } else if (rehearsalType === 'videoChat') {
                    total += nonProvidedRehearsalPerformers * VIDEO_CHAT_REHEARSAL_RATE;
                }
            } else if (rehearsalType === 'inPerson') {
                total += REHEARSAL_SPACE_FEE;
            }
        }

        // Stylized Lighting Cost
        if (stylizedLighting) {
            total += GAFFER_KIT_FEE * shootDays;
            total += (GAFFER_FEE + KEY_GRIP_FEE) * shootDays;
            crewMembers += 2; // Adding Gaffer and Key Grip
        }

        // Production Manager Fee
        total += PRODUCTION_MANAGER_FEE * shootDays;

        // Producer Fee
        total += PRODUCER_PROD_RATE * shootDays;

        // Director and DP Fees
        total += DIRECTOR_PROD_RATE * shootDays;
        total += DP_PROD_RATE * shootDays;

        // Sound Mixer Fee
        total += SOUND_MIXER_FEE * shootDays;

        // PA Fee
        total += PA_FEE * shootDays;

        // Special Props or Set Design Cost
        if (specialProps) {
            total += PRODUCTION_DESIGNER_FEE * 3 * shootDays; // 3 days of work per shoot day
            total += DESIGN_MATERIALS_FEE * shootDays;
        }

        // Special Wardrobe Cost
        if (wardrobePerformers > 0) {
            total += wardrobePerformers * WARDROBE_COST_PER_PERFORMER;
            total += WARDROBE_DESIGNER_FEE * 0.2 * shootDays; // 0.2 days of work per shoot day
        }

        // Hair and Makeup Artist Cost
        if (hairMakeupArtist) {
            total += MAKEUP_ARTIST_FEE * shootDays;
        }

        // 1st AD Fee if more than 2 scenarios per day
        if (scenes / shootDays > 2) {
            total += FIRST_AD_FEE * shootDays;
            crewMembers += 1; // Adding 1st AD
        }

        // Add Script Supervisor if pages per day exceed 15
        if (totalPages / shootDays > 15) {
            total += SCRIPT_SUPERVISOR_FEE * shootDays;
            crewMembers += 1; // Adding Script Supervisor
        }

        // Driver and Additional Vehicle Fee if more than one location per day
        if (totalLocations / shootDays > 1) {
            total += (DRIVER_FEE + ADDITIONAL_VEHICLE_FEE) * shootDays;
        }

        // Standard Vehicle Fee
        total += STANDARD_VEHICLE_FEE * shootDays;

        // Insurance, Subscriptions, Shipping Fee
        total += FLAT_FEE;

        // Craft Services Cost
        if (craftServices) {
            const totalPerformersPerDay = performersPerDay + providedPerformers;
            if (totalPerformersPerDay > 5) {
                crewMembers += 1; // Add 2nd AD
                total += SECOND_AD_RATE * shootDays;
            }
            if (totalLocations / shootDays > 2) {
                const extraPAs = Math.ceil((totalLocations / shootDays) - 2);
                total += ADDITIONAL_PA_FEE * extraPAs * shootDays;
                crewMembers += extraPAs;
            }
            total += (CRAFT_SERVICES_PER_CREW * crewMembers + CRAFT_SERVICES_PER_PERFORMER * totalPerformersPerDay) * shootDays;
        }

        // Expendables Cost
        total += EXPENDABLES_FEE * shootDays;

        // Hard Drive Cost
        total += HARD_DRIVE_FEE * shootDays;

        // Stitching Cost
        const stitchingDays = Math.ceil(shootDays * 1.5);
        total += STITCHING_RATE * stitchingDays;

        // Post-Production Days Estimation
        const totalDuration = scenes * pagesPerScenario; // Assuming 1 page = 1 minute
        const assistantEditorDays = Math.ceil(totalDuration / 30);
        const seniorEditorDays = Math.ceil(totalDuration / 10);
        const vfxDays = Math.ceil(totalDuration / 5);
        const postSoundDays = Math.ceil(totalDuration / 15);
        const coloristDays = Math.ceil(totalDuration / 20);

        // Post-Production Fees
        total += assistantEditorDays * ASSISTANT_EDITOR_RATE;
        total += seniorEditorDays * SENIOR_EDITOR_RATE;
        total += vfxDays * VFX_RATE;
        total += postSoundDays * POST_SOUND_RATE;
        total += coloristDays * COLORIST_RATE;

        // Invoice and 1099 Processing Fee
        total += PROCESSING_FEE_PER_CREW * crewMembers;

        // Calculate Complexity Score
        let complexityScore = 0;

        // Complexity based on number of scenarios
        if (scenes > 5) complexityScore += 1;
        if (scenes > 10) complexityScore += 1;

        // Complexity based on locations to secure
        if (locationsToSecure > 2) complexityScore += 1;
        if (locationsToSecure > 5) complexityScore += 1;

        // Complexity based on special requirements
        if (scriptwritingOption !== 'none') complexityScore += 1;
        if (numberOfCompanyMoves > 0) complexityScore += 1;
        if (stylizedLighting) complexityScore += 1;
        if (specialProps) complexityScore += 1;
        if (hairMakeupArtist) complexityScore += 1;

        // Determine contingency percentage (5% to 15%)
        let contingencyPercentage = 0.05 + (complexityScore / 9) * 0.10;

        // Calculate contingency amount
        let contingencyAmount = total * contingencyPercentage;

        // Add contingency to total
        total += contingencyAmount;

        // Display Contingency Percentage to User
        const contingencyPercentDisplay = document.getElementById('contingencyPercentDisplay');
        if (contingencyPercentDisplay) {
            contingencyPercentDisplay.innerText = (contingencyPercentage * 100).toFixed(1) + '%';
        }

        // Display the Total Cost without cents and formatted with commas
        const totalCostElement = document.getElementById('totalCost');
        const formattedTotal = '$' + Math.round(total).toLocaleString('en-US');
        totalCostElement.innerText = formattedTotal;

        // Show or hide the rehearsal performers field based on rehearsal type
        const rehearsalPerformersField = document.getElementById('rehearsalPerformersField');
        if (rehearsalType !== 'none') {
            rehearsalPerformersField.style.display = 'block';
        } else {
            rehearsalPerformersField.style.display = 'none';
        }
    }

    // Add event listeners to inputs to trigger the updateTotal function
    document.getElementById('numberOfScenes').addEventListener('input', updateTotal);
});
