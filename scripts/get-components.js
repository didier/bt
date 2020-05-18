
/**
 * @author Didier Catz <info@didiercatz.com>
 */

const readdirp = require('readdirp');
const fs = require('fs');

/**
 * `readdirp` settings
 * @constant
 */
const options = {
  root: 'src/views/partials/components',
  entryType: 'all',
  fileFilter: ['*.scss'],
  depth: 5
};

/** @param {Object} componentStyles - Array in which the matched `.scss` files will be stored */
const componentStyles = []
/** Gets all `.scss` component files in view/partials/components and outputs them to `_components.scss` */
function getComponents() {

  /** Clear `_components.scss` */
  fs.writeFile('src/styles/base/_components.scss', '', (err) => {
    if (err) throw err
  })

  /** Append componenty styles to `_components.scss` */
  readdirp('src/views/partials/components', { fileFilter: '*.scss', alwaysStat: true })
    .on('data', ({ path }) => componentStyles.push(path))
    .on('warn', error => console.error('non-fatal error', error))
    .on('error', error => console.error('fatal error', error))

    /*
    * This callback is executed everytime a file or directory is found inside the components directory.
    * Checks if the matched file is a valid `.scss` file
    */
    .on('end', () => {
      // console.log(...componentStyles);
      componentStyles
        .sort()
        .forEach(component => {
          if (component.includes('.scss')) {
            const componentName = component.replace('.scss', '').replace('_', '')

            fs.appendFileSync('src/styles/base/_components.scss', `@import '../../views/partials/components/${componentName}';\n`, (err) => {
              if (err) throw err
            })
          }
        })

      console.log('Appended all components to \`_components.scss\`')
    });
}

getComponents()
