
/**
 * @author Didier Catz <info@didiercatz.com>
 */

const readdirp = require('readdirp');
const fs = require('fs');

/**
 * `readdirp` settings
 * @constant
 */
const settings = {
  root: 'src/views/partials/components',
  entryType: 'all',
  fileFilter: ['*.scss'],
  depth: 5
};

/** @param {Object} componentStyles - Array in which the matched `.scss` files will be stored */
let componentStyles = [];

/** Gets all `.scss` component files in view/partials/components and outputs them to `_components.scss` */
function getComponents() {

  /** Clear `_components.scss` */
  fs.writeFileSync('src/styles/base/_components.scss', '', (err) => {
    if (err) throw err
  })

  readdirp(settings,
    /**
     * This callback is executed everytime a file or directory is found inside the components directory.
     * Checks if the matched file is a valid `.scss` file
     * */
    ({ name, path }) => `${path}`.includes('.scss') && componentStyles.push(path),

    /** This callback is executed when there are no more files to be found */
    (err) => {
      if (err) throw err;
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
    }
  )
}

getComponents()
