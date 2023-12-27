function processModules(moduleConfig) {
    const modules = {};
  
    // Parse module configuration
    moduleConfig.forEach(config => {
      const [moduleName, destinations] = config.split(" -> ");
      modules[moduleName] = {
        type: moduleName[0],
        destinations: destinations ? destinations.split(", ") : [],
        state: moduleName[0] === "%" ? false : null, // For flip-flop modules
        memory: {}, // For conjunction modules
      };
    });
  
    // Function to send a pulse to a module
    function sendPulse(moduleName, pulse) {
      const module = modules[moduleName];
  
      if (module.type === "%") {
        // Flip-flop module
        if (pulse === "low") {
          module.state = !module.state;
          return module.state ? "high" : "low";
        }
      } else if (module.type === "&") {
        // Conjunction module
        module.memory[pulse] = true;
  
        if (Object.values(module.memory).every(val => val)) {
          return "low";
        } else {
          return "high";
        }
      } else if (moduleName === "broadcaster") {
        // Broadcaster module
        module.destinations.forEach(dest => {
          console.log(sendPulse(dest, pulse));
        });
        return pulse;
      }
  
      // Default case: return the received pulse
      return pulse;
    }
  
    // Simulate pushing the button
    function pushButton() {
      console.log(sendPulse("broadcaster", "low"));
    }
  
    // Simulate processing pulses
    function simulatePulses() {
      pushButton();
      // Add logic to wait for pulses to be fully handled before pushing the button again
    }
  
    // Call the function to simulate pulse propagation
    simulatePulses();
  }
  
  // Example usage with the provided input
  const newExampleInput = [
    "broadcaster -> %a, %b, %c",
    "%a -> %b",
    "%b -> %c",
    "%c -> &inv",
    "&inv -> %a",
  ];
  processModules(newExampleInput);